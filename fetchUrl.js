const http = require("http");
const { execSync } = require("child_process");
const { resolve } = require("path");
const { rejects } = require("assert");
const core = require("@actions/core");


exports.getUrl = () =>{

    return new Promise((resolve,reject)=>{
        http.get("http://localhost:4040/api/tunnels", (res) => {
            let data = "";
            res.on("data", (chunk) => (data += chunk));
            res.on("end", () => {
                const resJSON = JSON.parse(data);
                const tunnels = resJSON.tunnels;
                core.info("ngrok output :- ",tunnels.find(({ proto }) => proto === "https"))
                const { public_url: url } = tunnels.find(({ proto }) => proto === "https");
                resolve(url)
                
            });
        });
    })
}

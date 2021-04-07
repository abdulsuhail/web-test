const http = require("http");
const { execSync } = require("child_process");
const { resolve } = require("path");
const { rejects } = require("assert");


exports.getUrl = () =>{

    return new Promise((resolve,reject)=>{
        http.get("http://localhost:4040/api/tunnels", (res) => {
            let data = "";
            res.on("data", (chunk) => (data += chunk));
            res.on("end", () => {
                const resJSON = JSON.parse(data);
                const tunnels = resJSON.tunnels;
        
                const { public_url: url } = tunnels.find(({ proto }) => proto === "https");
                resolve(url)
                // console.log(url);
        
                // Copy to clipboard
                switch (process.platform) {
                    case "win32":
                        execSync(`echo ${url} | clip`);
                        break;
                    
                    case "darwin":
                        execSync(`echo ${url} | pbcopy`);
                        break;
                        
                    case "linux":
                        // NOTE: this requires xclip to be installed
                        execSync(`echo ${url} | xclip -selection clipboard`);
                        break;
                        
                    default:
                        break;
                }
            });
        });
    })
}

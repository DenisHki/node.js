import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
  .prompt([
    {
      message: "Type in your URL: ",
      name: "URL",
    },
  ])
  .then((answers) => {
    const url = answers.URL;
    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream("qr_img.svg"));

    fs.writeFile('URL.txt', url, (err) => {
        if (err) {
            console.error("Error while saving the URL to a file:", err);
        } else {
            console.log('The file has been saved!');
        }
    }); 
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error("Prompt couldn't be rendered in the current environment.");
    } else {
      console.error("An unexpected error occurred:", error);
    }
  });

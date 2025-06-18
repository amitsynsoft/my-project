import {renderCubeWithFabricTexture} from "./main.js"
let addedImage = null;

      const canvasElement = document.getElementById("fiberCanvas");
      const canvas = new fabric.Canvas(canvasElement, {
        width: 600,
        height: 500,
      });


      function readURL(input, imgControlName) {
        if (input.files && input.files[0]) {
          const reader = new FileReader();
          reader.onload = function (e) {
            document.querySelector(imgControlName).src = e.target.result;
            document.querySelector(".preview1").classList.add("it");
            document.querySelector(".btn-rmv1").classList.add("rmv");
      
            // Add image to the Fabric.js canvas
            fabric.Image.fromURL(e.target.result, function (img) {
              const canvasWidth = canvas.width;
              const canvasHeight = canvas.height;
              const imgWidth = img.width;
              const imgHeight = img.height;
      
              // Scale the image to cover the entire canvas (without distortion)
              const scaleX = canvasWidth / imgWidth;
              const scaleY = canvasHeight / imgHeight;
      
              img.set({
                left: 0,
                top: 0, 
                scaleX: scaleX,
                scaleY: scaleY,
              });
      
              canvas.add(img);
              canvas.renderAll(); 
              addedImage = img;
            });
          };
          reader.readAsDataURL(input.files[0]);
        }
      }
      

      document.getElementById("imag").addEventListener("change", function () {
        const imgControlName = "#ImgPreview";
        readURL(this, imgControlName);
      });

      document
        .getElementById("removeImage1")
        .addEventListener("click", function (e) {
          e.preventDefault();
      handleRemove()
        });

      

      function handleRemove() {
        if (addedImage) {
          canvas.remove(addedImage); 
          canvas.renderAll();
          addedImage = null; 
      
       
          document.getElementById("imag").value = "";
          document.getElementById("ImgPreview").src = "";
          document.querySelector(".preview1").classList.remove("it");
          document.querySelector(".btn-rmv1").classList.remove("rmv");
        }
      }


     
      let scriptLoaded = false;


      document.getElementById("view3d").addEventListener("click", function () {
        if (!scriptLoaded) {
        
          const scriptTag = document.createElement("script");
          scriptTag.defer = true;
          scriptTag.type = "module";
          scriptTag.src = "main.js";
          document.body.appendChild(scriptTag);
          scriptLoaded = true;
        }

        const fabricDataUrl = canvas.toDataURL({
          format: "png",
          quality: 1,
        });
        renderCubeWithFabricTexture(fabricDataUrl);
      });
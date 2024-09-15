import React, { useState, useRef, useEffect } from "react";

const Painter = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const [history, setHistory] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [tool, setTool] = useState("brush");

  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 600;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.lineJoin = "round";
    saveState();
  }, []);

  const saveState = () => {
    const canvas = canvasRef.current;
    const newHistory = history.slice(0, currentStep + 1);
    newHistory.push(canvas.toDataURL());
    setHistory(newHistory);
    setCurrentStep(newHistory.length - 1);
  };

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = CANVAS_WIDTH / rect.width;
    const scaleY = CANVAS_HEIGHT / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    setIsDrawing(true);
    const context = canvas.getContext("2d");
    context.beginPath();
    context.moveTo(x, y);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    saveState();
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = CANVAS_WIDTH / rect.width;
    const scaleY = CANVAS_HEIGHT / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    const context = canvas.getContext("2d");
    context.lineTo(x, y);
    context.strokeStyle = color;
    context.lineWidth = brushSize;
    context.stroke();
  };

  const undo = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      loadState(currentStep - 1);
    }
  };

  const redo = () => {
    if (currentStep < history.length - 1) {
      setCurrentStep(currentStep + 1);
      loadState(currentStep + 1);
    }
  };

  const loadState = (step) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const img = new Image();
    img.src = history[step];
    img.onload = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0);
    };
  };

  const saveImage = async () => {
    const canvas = canvasRef.current;
    const base64Canvas = canvas.toDataURL("image/png").split(';base64,')[1];
    console.log(base64Canvas);
    //canvas.toDataURL(async (blob) => {
      //const formData = new FormData();
      //formData.append("file", blob, "painting.png");
      //console.log(blob);
      

      try {
        const response = await fetch("http://localhost:8000/image", {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "image": base64Canvas
          }),
        });

        if (response.ok) {
          console.log("Image uploaded successfully");
        } else {
          console.error("Image upload failed");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
  };

  

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    saveState();
  };

  const floodFill = (x, y, fillColor) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const targetColor = getPixel(imageData, x, y);

    if (colorsMatch(targetColor, fillColor)) return;

    const pixelsToCheck = [x, y];
    while (pixelsToCheck.length > 0) {
      const y = pixelsToCheck.pop();
      const x = pixelsToCheck.pop();

      const currentColor = getPixel(imageData, x, y);
      if (colorsMatch(currentColor, targetColor)) {
        setPixel(imageData, x, y, fillColor);
        pixelsToCheck.push(x + 1, y);
        pixelsToCheck.push(x - 1, y);
        pixelsToCheck.push(x, y + 1);
        pixelsToCheck.push(x, y - 1);
      }
    }

    ctx.putImageData(imageData, 0, 0);
    saveState();
  };

  const getPixel = (imageData, x, y) => {
    if (x < 0 || y < 0 || x >= imageData.width || y >= imageData.height) {
      return [-1, -1, -1, -1]; // impossible color
    } else {
      const offset = (y * imageData.width + x) * 4;
      return imageData.data.slice(offset, offset + 4);
    }
  };

  const setPixel = (imageData, x, y, color) => {
    const offset = (y * imageData.width + x) * 4;
    imageData.data[offset] = color[0];
    imageData.data[offset + 1] = color[1];
    imageData.data[offset + 2] = color[2];
    imageData.data[offset + 3] = color[3];
  };

  const colorsMatch = (a, b) => {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
  };

  const handleCanvasClick = (e) => {
    if (tool === "bucket") {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = Math.floor(
        (e.clientX - rect.left) * (canvas.width / rect.width)
      );
      const y = Math.floor(
        (e.clientY - rect.top) * (canvas.height / rect.height)
      );
      const fillColor = hexToRgb(color);
      floodFill(x, y, fillColor);
    } else {
      startDrawing(e);
    }
  };

  const hexToRgb = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255, 255];
  };

  return (
    <div className="h-screen bg-[#F5E6D3] p-4 font-comic-sans flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4 text-center bg-black text-white p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-full max-w-3xl transform rotate-1">
        GOOSE PAINTER 🪿
      </h1>
      <div className="flex-grow bg-white p-4 border-4 border-black border-dashed shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col w-full max-w-3xl transform -rotate-1">
        <div className="flex-grow flex flex-col">
          <div className="flex flex-wrap gap-2 mb-4 justify-center">
            <label className="flex items-center bg-yellow-300 p-2 border-2 border-black transform rotate-2">
              <span className="mr-2 font-bold">Color:</span>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-8 h-8 border-2 border-black"
              />
            </label>
            <label className="flex items-center bg-green-300 p-2 border-2 border-black transform -rotate-1">
              <span className="mr-2 font-bold">Brush:</span>
              <input
                type="range"
                min="1"
                max="50"
                value={brushSize}
                onChange={(e) => setBrushSize(parseInt(e.target.value))}
                className="w-24"
              />
              <span className="ml-2">{brushSize}px</span>
            </label>
            <button
              onClick={() => setTool("brush")}
              className={`px-3 py-1 font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-1 ${
                tool === "brush" ? "bg-blue-400" : "bg-gray-300"
              }`}
            >
              Brush 🖌️
            </button>
            <button
              onClick={() => setTool("bucket")}
              className={`px-3 py-1 font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-2 ${
                tool === "bucket" ? "bg-blue-400" : "bg-gray-300"
              }`}
            >
              Bucket 🪣
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mb-4 justify-center">
            <button
              onClick={undo}
              disabled={currentStep <= 0}
              className="bg-red-400 px-3 py-1 font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 disabled:cursor-not-allowed transform rotate-2"
            >
              Oopsie! 🙈
            </button>
            <button
              onClick={redo}
              disabled={currentStep >= history.length - 1}
              className="bg-blue-400 px-3 py-1 font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 disabled:cursor-not-allowed transform -rotate-1"
            >
              Redo 🔄
            </button>
            <button
              onClick={clearCanvas}
              className="bg-yellow-400 px-3 py-1 font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-1"
            >
              Erase All! 🧽
            </button>
            <button
              onClick={saveImage}
              className="bg-purple-400 px-3 py-1 font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-2"
            >
              Save Masterpiece 🖼️
            </button>
          </div>
          <div
            ref={containerRef}
            className="flex-grow flex justify-center items-center"
          >
            <div
              className="relative"
              style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
            >
              <canvas
                ref={canvasRef}
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                className="absolute top-0 left-0 w-full h-full border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                onMouseDown={handleCanvasClick}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseOut={stopDrawing}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Painter;
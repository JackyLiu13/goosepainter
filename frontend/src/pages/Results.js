import React from 'react';
import { useNavigate } from 'react-router-dom';

const StoryReveal = () => {
  const navigate = useNavigate();
  const images = [
    { src: '/path/to/image1.jpg', caption: 'Caption 1' },
    { src: '/path/to/image2.jpg', caption: 'Caption 2' },
    { src: '/path/to/image3.jpg', caption: 'Caption 3' },
  ];

  const goToPodium = () => {
    navigate('/podium');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fbe5c8] font-sans p-4">
      {/* Falling Vine */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 vines"></div>

      {/* Image Row */}
      <div className="flex justify-center space-x-4 mb-8">
        {images.map((image, index) => (
          <div key={index} className="text-center">
            <img 
              src={image.src} 
              alt={`Story Image ${index + 1}`} 
              className="w-32 h-32 object-cover rounded-lg shadow-md"
            />
            <p className="mt-2 text-sm font-medium">{image.caption}</p>
          </div>
        ))}
      </div>

      {/* Story Section */}
      <div className="max-w-2xl text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Story</h2>
        <p className="text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam 
          viverra, nunc eu tempor tincidunt, nisi nisl aliquam magna, eget 
          aliquam nunc nisl eu nunc. Sed euismod, nunc eu tempor tincidunt, 
          nisi nisl aliquam magna, eget aliquam nunc nisl eu nunc.
        </p>
      </div>

      {/* Button to Podium */}
      <button 
        onClick={goToPodium}
        className="px-8 py-3 text-xl bg-black text-white rounded-lg shadow-md hover:bg-gray-800 transition duration-300"
      >
        View Podium
      </button>
    </div>
  );
};

export default StoryReveal;
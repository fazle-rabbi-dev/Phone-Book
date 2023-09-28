import React from "react";

function FeatureCard({data}) {
  return (
    <div class="my-4 p-6 rounded rounded-2xl bg-gray-100">
      <div className="my-5">
        <span className="bg-gray-200 p-3 rounded text-xl">{data.emoji}</span>
      </div>
      <h2 class="text-lg mb-2">{data.title}</h2>
      <p className="text-gray-600">{data.details}</p>
    </div>
  );
}

export default FeatureCard;

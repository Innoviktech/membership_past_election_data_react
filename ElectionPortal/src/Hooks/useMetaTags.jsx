import { useEffect } from "react";

const useMetaTags = () => {
  useEffect(() => {
    // Function to update or create meta tag
    const updateMetaTag = (property, content) => {
      let tag = document.querySelector(`meta[property='${property}']`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    // ✅ Update og:url dynamically
    updateMetaTag("og:url", window.location.href);

    // You can also set dynamic title/description/images if needed
    updateMetaTag("og:title", document.title || "Election Portal");
    updateMetaTag("og:description", "This is my React page.");
    updateMetaTag("og:image", "https://example.in/default-image.png");
  }, []);
};

export default useMetaTags;

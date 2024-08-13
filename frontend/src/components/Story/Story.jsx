import React, { useState } from "react";
import "./Story.scss";

const Story = () => {
  const [readMore, setReadMore] = useState(false);

  const handleReadMore = () => {
    setReadMore(true);
  };
  const handleReadLess = () => {
    setReadMore(false);
  };

  return (
    <section className="Story">
      <div className="Story-item">
        <img src="/asset/story.jpg" alt="story" />
        <div className="paragraph">
          <h4>OUR STORY</h4>
          <h1>Welcome to LeatherHaven, where craftsmanship meets passion.</h1>
          <p className="para1">
            Founded in [Year], our journey began with a simple vision: to create
            premium leather products that stand the test of time. Each piece in
            our collection is a testament to our commitment to quality and
            attention to detail.
          </p>
          <p className="para2">
            From the very beginning, we have been dedicated to sourcing the
            finest materials and working with skilled artisans to bring you
            leather goods that not only look good but also feel good to own.
            Whether it's a classic leather jacket, a finely crafted handbag, or
            a sleek wallet, every item at LeatherHaven is made with care,
            ensuring it becomes a part of your story.
          </p>
          {readMore && (
            <>
              <p className="para3">
                Our mission is to provide our customers with exceptional
                products that combine style, durability, and sustainability. We
                believe that leather is more than just a material—it's a symbol
                of timeless elegance and enduring quality.
              </p>
              <p className="para4">
                At LeatherHaven, we are more than just a brand; we are a
                community of leather enthusiasts who value the art of
                traditional craftsmanship. We are proud to offer you products
                that are as unique as you are, designed to accompany you on all
                of life’s adventures.
              </p>
              <p className="para5">
                Thank you for being a part of our story. We invite you to
                explore our collection and discover the LeatherHaven difference.
              </p>
              <button onClick={handleReadLess}> Read Less </button>
            </>
          )}
          {!readMore && <button onClick={handleReadMore}> Read More </button>}
        </div>
      </div>
    </section>
  );
};

export default Story;

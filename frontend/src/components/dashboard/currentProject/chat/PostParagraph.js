import React, { useState, useEffect } from "react";

const PostParagraph = ({ comment }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    if (comment !== "") {
      let regex = /@\[.+?\]\(.+?\)/gm;
      let displayRegex = /@\[.+?\]/g;
      let idRegex = /\(.+?\)/g;
      let matches = comment.match(regex);
      let arr = [];
      matches &&
        matches.forEach((m) => {
          let id = m.match(idRegex)[0].replace("(", "").replace(")", "");
          let display = m.match(displayRegex)[0].replace("@[", "").replace("]", "");

          arr.push({ id: id, display: display });
        });
      let newComment = comment.split(regex);
      let output = "";
      for (let i = 0; i < newComment.length; i++) {
        const c = newComment[i];
        if (i === newComment.length - 1) output += c;
        else output += c + `<a href="/People/${arr[i].id}">${arr[i].display}</a>`;
      }
      setText(output);
    }
  }, [comment]);

  return (
    <div>
      <p
        className="d-inline comment-paragraph-text"
        dangerouslySetInnerHTML={{
          __html: text.replace(/\n\r?/g, "<br />")
        }}
      />
    </div>
  );
};

export default PostParagraph;

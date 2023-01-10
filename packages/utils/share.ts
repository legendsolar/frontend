export const getFacebookShareUrl = ({ url, message, title }: ShareMessage) => {
  return `https://facebook.com/sharer/sharer.php?u=${url}&qoute=${message}&title=${title}&display=page`;
};

export const getLinkedInShareUrl = ({ url, message, title }: ShareMessage) => {
  return `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${message}`;
};

export const getTwitterShareUrl = ({ message }: ShareMessage) => {
  return `https://twitter.com/intent/tweet?text=${message}`;
};

export const getEmailShareUrl = ({ title, message }: ShareMessage) => {
  return `mailto:?subject=${title}&body=${message}`;
};

// from https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
export const fallbackCopyTextToClipboard = (text: string) => {
  var textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand("copy");
    var msg = successful ? "successful" : "unsuccessful";
    console.log("Fallback: Copying text command was " + msg);
  } catch (err) {
    console.error("Fallback: Oops, unable to copy", err);
  }

  document.body.removeChild(textArea);
};

export const copyTextToClipboard = (text: string) => {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(
    function () {
      console.log("Async: Copying to clipboard was successful!");
    },
    function (err) {
      console.error("Async: Could not copy text: ", err);
    }
  );
};

export interface ShareMessage {
  title: string;
  url: string;
  message: string;
}

export const getUrlWithMessage = (shareUrl: string) => {
  const string = `I reserved solar panels on Legends Solar.\nInvest in operating panels on commercial solar facilities. You’ll collect cash earnings as your panels generate and sell electricity. Sign up here: ${shareUrl}!`;

  return {
    title: encodeURIComponent("Sign up"),
    url: shareUrl,
    message: encodeURIComponent(string),
  };
};

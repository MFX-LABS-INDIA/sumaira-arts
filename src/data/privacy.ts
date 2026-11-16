export const privacyPolicy = {
  title: "Privacy Policy",
  introduction:
    "This notice explains how Sumaira Arts handles the details you provide through the Contact Us form.",
  sections: [
    {
      title: "Information we collect",
      paragraphs: [
        "The form collects your name, email address, mobile number and country calling code. Your address is optional.",
      ],
    },
    {
      title: "How we use your information",
      paragraphs: [
        "We use your details to respond to your enquiry. They are not added to a marketing mailing list.",
      ],
    },
    {
      title: "Where your information goes",
      paragraphs: [
        "Enquiries are sent to the studio email account configured for this website and saved in the enquiries tab of its configured Google Sheets document. Email and spreadsheet providers process the information to deliver and store it.",
        "Access is governed by the permissions set for the studio email account and spreadsheet.",
      ],
    },
    {
      title: "Retention and your requests",
      paragraphs: [
        "The website does not apply an automatic deletion schedule. Enquiries remain in the studio email account and spreadsheet until they are manually removed.",
        "To request access to, correction of, or deletion of your enquiry, email the studio using the address below.",
      ],
    },
  ],
} as const;

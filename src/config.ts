/** Site copy — customize names and messages here */
export const birthdayConfig = {
  recipientFirstName: "April",
  /** Shown during the breach sequence */
  realNameScare: "Beza",
  instagramStartFollowers: 739,
  headlineReveal: "Happy Birthday",
  heartfeltLine:
    "The world got luckier the day you showed up — today we’re just making that official.",
  wishes: [
    "Thanks for turning ordinary weeks into something worth remembering.",
    "Here’s to more chaos, more memes, and more stories only we would believe.",
  ],
  galleryImages: [
    { src: "https://picsum.photos/seed/april1/400/400", caption: "Evidence file A" },
    { src: "https://picsum.photos/seed/april2/400/400", caption: "Evidence file B" },
    { src: "https://picsum.photos/seed/april3/400/400", caption: "Classified fun" },
  ] as { src: string; caption: string }[],
  receipt: {
    transactionId: "APR-BDAY-∞",
    amount: "1 birthday worth keeping",
    currency: "gratitude & good chaos",
    paidTo: "April",
  },
};

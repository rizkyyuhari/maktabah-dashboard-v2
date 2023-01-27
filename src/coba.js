const cpba = [
  {
    pk_categoryid: "jancok13",
    sub_category: ["ara", "asdfas"],
  },
  {
    pk_categoryid: "jnacok10",
  },
  {
    pk_categoryid: "asdf",
  },
  {
    pk_categoryid: "rizky",
  },
];

console.log(cpba.find((cpba) => cpba.pk_categoryid === "rizky"));

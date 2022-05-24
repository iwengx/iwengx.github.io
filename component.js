const save = (fileName) => {
   console.log(`will be save ${fileName} file.`);
   console.log('save event');
};

const read = (fileName) => {
   console.log(`open the ${fileName} file.`);
};

const write = (fileName, content) => {
   console.log(`write ${content} into ${fileName}`);
};

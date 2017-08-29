#!/usr/bin/env node
//tool to convert files is called flac2mp3, invoked via command line with various options

const fs = require('fs');
const process = require('process');
const childProcess = require('child_process');
const program = require('commander');
const filesToKeep = {
  wmv: true,
  m4a: true,
  aac: true,
  mp3: true,
  flac: true,
};
const needToConvert = {
  flac: true,
  wmv: true,
};
//will use childProcess to invoke flac2mp3
const converterLib = {
  /**
   * processes input from CLI or tests
   * @param  {array} input test array or process.argv
   * @return {object} object containing params passed to CLI
   */
  processCLI(input){
    let output;
    program
      // .option('-d, --day', 'specify to run for files from the last day')
      .option('-w, --week', 'specify to run for files from the last week')
      .option('-m, --month', 'specify to run for files from the last month')
      .option('-p, --path [path]', 'specify directory to run script in')
      .parse(input)
    output.month = program.month;
    output.week = program.week;
    // figure out how to link path correctly
    output.path = program.path || '/files';
    return output;
  },

  /**
   * determine max age of files/folders to process
   * @param  {number} today today's date in ms
   * @param  {boolean} week  true if week flag was passed to cli
   * @param  {boolean} month true if month flag was passed to cli
   * @return {number} max age of files to process in ms
   */
  findDateRange(today, { week, month }){
    let rangeMs = 86400000;
    if(week){
      rangeMs *= 7;
    } else if(month){
      rangeMs *= 30;
    }
    return today - rangeMs;
  },

  /**
   * determine current date in ms using Date object
   * @return {number} current date in ms
   */
  getCurrentDate(){
    const today = new Date();
    const todayMs = today.getTime();
    return todayMs;
    // output should be in acceptable date output to compare
  }.

  /**
   * determines if date falls within acceptable range
   * @param  {number} dateRange oldest date within range
   * @param  {number} dateCheck date to check
   * @return {boolean} true if date is within range, false otherwise
   */
  compareDates(dateRange, dateCheck){
    if(dateRange < dateCheck){
      return true;
    }
    return false;
    // output should be true, date is in range, or false, out of range
  },

  /**
   * determine what folders are within the date range specified
   * @param  {[type]} directory [description]
   * @param  {[type]} dateRange [description]
   * @return {[type]}           [description]
   */
  findFoldersInDateRange(directory, dateRange){
    const outputArr = fs.readdirSync(directory);
    outputArr.forEach((folder) => {
      const inputDate = this.getFolderAge(folder);
      if(this.compareDates(dateRange, inputDate)){
        fs.renameSync(folder, `./convertedFiles/${folder}`);
      }
    })
  },

  /**
   * check if file has accepted extension according to input object
   * @param  {string} file name of file
   * @return {boolean} true if file is of accepted type, false otherwise
   */
  matchFileType(file, compareObj){
    const extension = file.split('.')[-1];
    if(compareObj[extension]){
      return true;
    }
    return false;
  }

  /**
   * determine age of input, for files and folders
   * @param  {string} input file or folder to find age of
   * @return {number} age of input in ms
   */
  getAge(input){
    const { birthTimeMs } = fs.statSync(input);
    return birthTimeMs;
  },

  /**
   * moves files to keep to output folder
   * @param  {[type]} file [description]
   * @param  {[type]} dest [description]
   * @return {[type]}      [description]
   */
  copyFilesToOutput(file, dest){

  },

  /**
   * invokes flac2mp3 converter for file
   * @param  {[type]} file [description]
   * @return {[type]}      [description]
   */
  callFlac2Mp3(file){

  },
  /**
   * executes functions to run script
   * @return {[type]} [description]
   */
  runConverter(input){
    try {
      const output = this.processCLI(input);
      const today = this.getCurrentDate();

    } catch(err){
      throw err;
    }
  },

};

module.exports = converterLib

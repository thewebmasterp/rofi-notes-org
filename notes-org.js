#!/usr/bin/env node

const USER = process.env.USER || ''

//Modify this setting to change the default note file location
const NOTES_FILE = `/home/${USER}/.notes_org`

const fs = require('fs')
const args = process.argv.slice(2)

const orgToTxt = rawdata => {
  // Uncomment if you want to disable org mode format and store notes in plain text instead (below as well)
  // return rawdata

  let arr = rawdata.split('\n')
  arr.shift()
  arr = arr.map(line => {
    return line.slice(2)
  })
  return arr.join('\n')
}

const txtToOrg = rawdata => {
  // Uncomment if you want to disable org mode format and store notes in plain text instead
  // return rawdata

  let arr = rawdata.split('\n').filter(el => {
    return el !== ''
  })
  arr = arr.map(line => {
    return `* ${line}`
  })
  if (arr[0] !== '; -*- mode: org;-*-') {
    arr.unshift('; -*- mode: org;-*-')
  }
  return arr.join('\n')
}

fs.readFile(NOTES_FILE, 'utf8', (err, rawdata) => {
  const data = orgToTxt(rawdata)
  if (err) throw err
  if (args[0]) {
    const arr = data.split('\n')
    if (arr.includes(args[0])) {
      const indexToRemove = arr.indexOf(args[0])
      arr.splice(indexToRemove, 1)
    } else {
      arr.push(args[0])
    }
    const newData = txtToOrg(arr.join('\n'))
    fs.writeFile(NOTES_FILE, newData, err => {
      if (err) throw err
    })
  } else {
    //console.log(data)
    const arr = data.split('\n').map(line => {
      return `${line}\0icon\x1finput-tablet\n`
    })
    console.log(arr.join(''))
  }
})

console.log('\0prompt\x1fNote\n')

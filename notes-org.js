#!/usr/bin/env node

const args = process.argv.slice(2)
const YAML = require('yaml')
const fs = require('fs')

const USER = process.env.USER || ''
const HOME_DIR = `/home/${USER}`
const CONFIG_PATH = `${HOME_DIR}/.config/rofi/rofi-notes-org.yaml`
const config = YAML.parse(fs.readFileSync(CONFIG_PATH, 'utf8')) || {}

// Some dirty, quick validation
if (!fs.existsSync(config['notes-file'])) {
  const tryagain = config['notes-file'].replace('~', HOME_DIR)
  if (!fs.existsSync(tryagain)) {
    console.error(
      `Couldn't validate "notes-file" property with value "${
        config['notes-file']
      }" passed in "${CONFIG_PATH}"`
    )
  } else {
    config['notes-file'] = tryagain
  }
}
config['plain-text-format'] = !!config['plain-text-format']

// Translator functions
const orgToTxt = rawdata => {
  if (config['plain-text-format']) {
    return rawdata
  }

  let arr = rawdata.split('\n')
  arr.shift()
  arr = arr.map(line => {
    return line.slice(2)
  })
  return arr.join('\n')
}

const txtToOrg = rawdata => {
  if (config['plain-text-format']) {
    return rawdata
  }

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

// Main
fs.readFile(config['notes-file'], 'utf8', (err, rawdata) => {
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
    fs.writeFile(config['notes-file'], newData, err => {
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

const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if(msg.author.bot) return;
  if(msg.author.id === client.user.id) return;

  const id = msg.author.id;
  const name = msg.author.username;

  const filePath = `./data/${id}.json`;

  !fs.existsSync(filePath) ? fs.writeFileSync(filePath, JSON.stringify({})) : null; // 파일이 없다면 생성

  const user = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const today = new Date();
  const date = "" + today.getFullYear() + today.getMonth() + today.getDate();
  const howMuch = 5000;

  if(msg.content === "얼쑤머니 줘"){
    let saveUser = {};
    if(user.id) {
      if(user.date === date) {
        msg.reply(`오늘은 이미 받았잖아? 내일 받아!`);
        saveUser = user;
      }
      else {
        msg.reply(`${howMuch}원이 지급됐어!\n${name}의 현재 잔액은 ${user.money} -> ${user.money + howMuch}이야!`);
        saveUser = {
          id,
          name,
          date,
          money : user.money + howMuch,
        }
      }
    }
    else {
      msg.reply(`${name}!! 시작하는걸 환영해! ${howMuch}원이 지급됐어!`);
      saveUser = {id, name, date, money : howMuch};
    }

    fs.writeFileSync(filePath, JSON.stringify(saveUser));
  }

  if(msg.content === "얼쑤머니 잔액"){
    user.id ? msg.reply(`${name}의 현재 잔액은 ${user.money}이야!`) : msg.reply(`등록되지 않은 유저야! 얼쑤머니 줘를 입력해봐!`);
  }


});

client.login('');
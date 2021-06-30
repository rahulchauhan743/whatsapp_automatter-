const puppeteer = require("puppeteer");


//numbersArray is required from numbers.js
const numbersArray = require("./numbers.js");

(async() => {

    try {

        //browser is launched
        const browser = await puppeteer.launch({
            headless: false,
            slowMo: 50,
            defaultViewport: null,
            timeout: 0,
            args: ["--start-maximized"],
            executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",

        });

        // a new page is created after browser is opened
        const page = await browser.newPage();

        //navigate on whatsapp web
        await page.goto("https://web.whatsapp.com/");


        //this function is used to send whatsapp message to a number
        async function sendWhatsappMessages(number) {
            //message which will be sended to all numbers
            let messageToBeSend = "stay safe and wear mask";
            messageToBeSend = messageToBeSend.toUpperCase();

            //here we wait for text area where we will type number to which we will send message
            await page.waitForSelector("._2_1wd.copyable-text.selectable-text");
            await page.type("._2_1wd.copyable-text.selectable-text", number);

            //then we press enter so that we can type message
            await page.keyboard.press("Enter")
            await page.waitForSelector("[data-tab='6']");

            //we type message in input area
            await page.type("[data-tab='6']", messageToBeSend);

            //then we  click on send button
            await page.waitForSelector("._1E0Oz");
            await page.click("._1E0Oz");

        }

        //this function is used to send whatsapp emoji to a number
        async function sendEmoji() {

            //here we open emoji tab where all emoji are there
            await page.waitForSelector("._3k0dC._2zMTD._2NHIO._15ScS.VRn4o");
            await page.click("._3k0dC._2zMTD._2NHIO._15ScS.VRn4o");

            //here we select a particular emoji
            await page.waitForSelector(".b75.emojik.wa");
            await page.click(".b75.emojik.wa");

            //then we  click on send button
            await page.waitForSelector("._1E0Oz");
            await page.click("._1E0Oz");
        }

        //this function is used to  mute a number after emoji and message is sent to a number
        function muteAWhatsappNumber() {

            return new Promise(function(resolve, reject) {
                page.evaluate(function() {

                    //here we click on menu option which contains mute option and other options
                    let menuOption = document.querySelectorAll("[data-testid='menu']");
                    menuOption[1].click();

                    //here we click on mute option 
                    let muteNotifications = document.querySelectorAll("._11srW._2xxet");
                    muteNotifications[4].click();

                    //here we click on mute button so that number is muted in whatsapp
                    let muteNotificationsButton = document.querySelectorAll(".VtaVl.-TvKO");
                    muteNotificationsButton[1].click();

                    //here if the whatsapp number is not muted so we go  in .then and the number is muted
                }).then(function() {
                    resolve();
                })

                //here if the whatsapp number is  muted so we go  in .catch and the number is unmuted
                .catch(function() {
                    resolve();
                })
            })

        }
        //this loop performs all three function on numbersArray individual element
        for (let i = 0; i < numbersArray.length; i++) {
            await sendWhatsappMessages(numbersArray[i]);

            await sendEmoji();

            await muteAWhatsappNumber();
        }

        addNumbersTogroup();


        //this function is used to  add  numbers to a whatsapp group and name the whatsapp group to a emoji
        function addNumbersTogroup() {

            //here we click on chat button which open new grp option
            await page.waitForSelector("[data-testid='chat']");
            await page.click("[data-testid='chat']");

            //here we click on new group button 
            await page.waitForSelector("._1_JE6");
            await page.click("._1_JE6");

            //here in type contact name area type number and press enter
            for (let i = 0; i < numbersArray.length; i++) {
                await page.type("._38sK8.copyable-text.selectable-text", numbersArray[i]);
                await page.keyboard.press("Enter")
            }

            //click on arrow button to navigate 
            await page.waitForSelector("[data-testid='arrow-forward']");
            await page.click("[data-testid='arrow-forward']");

            //then we select emoji panel to name the group as emoji
            await page.waitForSelector("[data-testid='emoji-input']");
            await page.click("[data-testid='emoji-input']");

            //select a particular emoji here we type "rh" to select rhino emoji
            await page.waitForSelector(".L6jO-");
            await page.type(".L6jO-", "rh");

            //click on enter to select the emoji
            await page.keyboard.press("Enter");

            //click enter to create the group
            await page.keyboard.press("Enter");
        }

    } catch (error) {
        console.log(error);
    }


})()
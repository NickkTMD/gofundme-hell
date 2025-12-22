import puppeteer from 'puppeteer';
import { DateTime } from 'luxon';
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import { parseDonations } from './utils';
import fs from 'fs';

const SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const SESSION_TOKEN = process.env.AWS_SESSION_TOKEN;
if (!SECRET_ACCESS_KEY || !ACCESS_KEY_ID || !SESSION_TOKEN) {
    throw new Error("AWS SECRET_ACCESS_KEY, ACCESS_KEY_ID, and SESSION_TOKEN must be set");
}

const client = new BedrockRuntimeClient({
    region:'us-east-1', 
	credentials:{
		accessKeyId: ACCESS_KEY_ID,
		secretAccessKey: SECRET_ACCESS_KEY,
        sessionToken: SESSION_TOKEN,
	}
});

const urls = [
    "https://www.gofundme.com/f/evelyns-unexpected-medical-expenses",
    "https://gofundme.com/f/david-gerrolds-health-and-leukemia-fundraiser",
    // "https://www.gofundme.com/f/marley-aged-4-third-cancer-one-last-treatment",
    // "https://www.gofundme.com/f/olsen-aged-2-beat-leukaemia",
    "https://www.gofundme.com/f/help-support-ellie",
    "https://www.gofundme.com/f/support-illanas-twins-facing-major-surgeries",
    "https://www.gofundme.com/f/help-frederico-fight-stage-4-cancer",
    "https://www.gofundme.com/f/support-for-baby-ryland",
    "https://www.gofundme.com/f/mjs-fight-against-bone-cancer",
    "https://www.gofundme.com/f/ScarlettMcAlpine",
    "https://www.gofundme.com/f/support-3-year-old-harper-family",
    "https://www.gofundme.com/f/izzys-medical",
    "https://www.gofundme.com/f/zewg7v64",
    "https://www.gofundme.com/f/help-bryson-fight-child-cancer",
    "https://www.gofundme.com/f/3on218w",
    "https://www.gofundme.com/f/help-danielle-with-childs-cancer-expenses",
    // "https://www.gofundme.com/f/support-gosh-cw-for-eduardo-pessoa-de-araujo",
    "https://www.gofundme.com/f/support-for-the-alfreds-journey-with-child-cancer",
    "https://www.gofundme.com/f/help-ease-a-childs-cancer-journey",
    "https://www.gofundme.com/f/help-the-huneycutt-family-fight-childrens-cancer",
    "https://www.gofundme.com/f/aiming-to-save-a-life",
    "https://www.gofundme.com/f/help-little-hazal-fight-leukemia",
    "https://www.gofundme.com/f/kid-the-youngers-surgery-and-ongoing-medical-care",
    "https://www.gofundme.com/f/wrsffr-angels-medical-bills",
    "https://www.gofundme.com/f/vrbcp-medical-bill-assistance",
    "https://www.gofundme.com/f/help-the-gosse-family-navigate-caring-for-a-sick-kid",
    "https://www.gofundme.com/f/medical-fund-for-cassius-the-warrior-kid",
    "https://www.gofundme.com/f/teamcoop-hospital-bills",
    "https://www.gofundme.com/f/ce78k-mackenzies-medical-expenses",
    "https://www.gofundme.com/f/help-to-support-medical-expenses",
    "https://www.gofundme.com/f/micahs-chubbies-medical-expenses",
    "https://www.gofundme.com/f/d6fcgz-stop-gun-violence",
    "https://www.gofundme.com/f/nikos-type-1-diabetes-medical-expenses",
    "https://www.gofundme.com/f/help-with-costs-of-presleys-medical-care",
    "https://www.gofundme.com/f/asa-walkers-medical-expenses",
    "https://www.gofundme.com/f/helpforeli",
    "https://www.gofundme.com/f/donate-to-help-with-logans-medical-expenses",
    "https://www.gofundme.com/f/emergency-medical-expenses-for-our-baby-kingstin",
    "https://www.gofundme.com/f/teamatticus",
    "https://www.gofundme.com/f/zte7xz-medical-expenses",
    // "https://www.gofundme.com/f/little-cj039s-medical-expenses",
    "https://www.gofundme.com/f/9z58j-natalies-medical-expenses",
    "https://www.gofundme.com/f/jacer-all",
    "https://www.gofundme.com/f/laeneys-medical-expenses",
    "https://www.gofundme.com/f/help-baby-logans-medical-expenses",
    "https://www.gofundme.com/f/medical-expenses-for-baby-kynnidi",
    "https://www.gofundme.com/f/greer-and-estelle-need-help-with-medical-expenses",
    "https://www.gofundme.com/f/2g7uzz8k",
    "https://www.gofundme.com/f/baby-sulleys-medical-expenses",
    "https://www.gofundme.com/f/peters-journey-medical-expenses",
    // "https://www.gofundme.com/f/support-cayla-and-coles-kids-medical-bills",
    "https://www.gofundme.com/f/jett-machs-medical-bills",
    "https://www.gofundme.com/f/help-cover-warrens-medical-bills",
    "https://www.gofundme.com/f/help-jax-and-family-with-medical-expenses",
    "https://www.gofundme.com/f/help-corey-pay-for-his-newborns-medical-bills",
    "https://www.gofundme.com/f/baby-daniels-fight-medical-help-needed",
    "https://www.gofundme.com/f/baby-cross-johnson-medical-expenses",
    "https://www.gofundme.com/f/baby-annabelles-medical-fund",
    "https://www.gofundme.com/f/baby-john-nicu-medical-expenses",
    "https://www.gofundme.com/f/assist-our-family-during-babys-medical-care",
    "https://www.gofundme.com/f/help-with-baby-prestons-medical-fund",
    "https://www.gofundme.com/f/baby-aiden-medical-treatment-fund",
    "https://www.gofundme.com/f/baby-bensons-medical-battle-needs-you",
    "https://www.gofundme.com/f/support-for-baby-jjs-medical-journey",
    "https://www.gofundme.com/f/help-4months-baby-girl-need-a-heart-surgery",
    "https://www.gofundme.com/f/baby-enzos-heart-surgery-and-medical-expenses",
    "https://www.gofundme.com/f/baby-theodores-medical-support",
    "https://www.gofundme.com/f/support-my-sons-family-through-their-medical-crisis",
    "https://www.gofundme.com/f/support-for-baby-bennys-medical-journey",
    "https://www.gofundme.com/f/the-beans-medical-bills",
    "https://www.gofundme.com/f/help-in-the-fight-for-baby-theos-life",
    "https://www.gofundme.com/f/baby-bratt-medical-expense-fund",
    "https://www.gofundme.com/f/baby-laylas-medical-fund",
    "https://www.gofundme.com/f/babyjameus",
    "https://www.gofundme.com/f/medical-and-funeral-expenses-for-baby-dominic",
    "https://www.gofundme.com/f/baby-masons-medical-fund-helping-roy-and-haley",
    "https://www.gofundme.com/f/baby-violets-medical-support",
    "https://www.gofundme.com/f/bjfz3-maxs-medical-bills",
    "https://www.gofundme.com/f/baby-larkens-medical-fund",
    "https://www.gofundme.com/f/help-with-addisons-medical-journey",
    "https://www.gofundme.com/f/support-for-lexi-and-norastarrs-medical-journeys",
    "https://www.gofundme.com/f/baby-gabriels-struggle-medical-costs",
    "https://www.gofundme.com/f/g5vsnh-support-baby-masons-medical-journey"
];

const browser = await puppeteer.launch({ headless: false, defaultViewport: { width: 1920, height: 1080 } });
const page = await browser.newPage();

for (const url of urls) {
    const slug = url.split('/').pop();
    if (fs.existsSync(`./output/${slug}`)) {
        console.log("Skipping:", url, slug);
        continue;
    }

    console.log("Processing:", url, slug);
    
    page.goto(url);
    await page.waitForNetworkIdle();

    const title = await page.evaluate(() => {
        return document.querySelector('.p-campaign-title')?.textContent;
    });

    const cdnImages = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('img[src*="images.gofundme.com"]')).map((img) => (img as HTMLImageElement).src);
    });

    const cloudfrontImages = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('img[src*="d2g8igdw686xgo.cloudfront.net"]')).map((img) => (img as HTMLImageElement).src);
    });

    const CLOUDFRONT_URL = "https://d2g8igdw686xgo.cloudfront.net";
    const images = new Set([...cdnImages, ...cloudfrontImages].flatMap((img) => {
        if (!img.includes(CLOUDFRONT_URL)) return [];

        return [CLOUDFRONT_URL + img.split(CLOUDFRONT_URL)[1]];
    }))

    const description = await page.evaluate(() => {
        return document.querySelector('div[data-testid="campaign-description"]')?.textContent;
    });

    const donationsStr = await page.evaluate(() => {
        return document.querySelector('.progress-meter h2')!.textContent;
    });
    const [raised, goal] = parseDonations(donationsStr);

    const numDonationsStr = (await page.evaluate(() => {
        return document.querySelector('.progress-meter .hrt-text-body-sm.hrt-text-supporting')?.textContent
    }))

    const creationDateString = (await page.evaluate(() => {
        return document.querySelector('.a-created-date')?.textContent;
    }))?.replace("Created ", "").replace(/(\d+)(st|nd|rd|th)/, '$1').trim();
    const creationDate = creationDateString ? DateTime.fromFormat(creationDateString, 'MMMM d, yyyy').toISODate() : null;

    const result = await client.send(new InvokeModelCommand({
        modelId: "anthropic.claude-3-5-sonnet-20240620-v1:0",
        contentType: "application/json",
        accept: "application/json",
        body: JSON.stringify({
            anthropic_version: "bedrock-2023-05-31",
            max_tokens: 1000,
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: `The following is a description of a GoFundMe campaign. Please return (1) the name of the person the campaign is for, (2), their age in years, (3) the disease or condition that the campaign is for. Be as specific as possible. If you are not sure, return "Unknown" for the name and disease, and -1 for age. Return as JSON with the keys "name", "age", and "disease". Do NOT return anything other than the JSON.\n\nTitle: ${title}\nDescription: ${description}`
                        }
                    ]
                }
            ]
        }),
    }));

    const responseBody = JSON.parse(new TextDecoder().decode(result.body));
    const { name, age, disease } = JSON.parse(responseBody.content[0].text.trim());

    const baseData = {
        url,
        slug,
        title,
        description,
        images,
        donationsStr,
        numDonationsStr,
        creationDate,
        name,
        age,
        disease,
        raised,
        goal
    }

    // If any keys are undefined, raise
    for (const key of Object.keys(baseData)) {
        if (!baseData[key]) {
            throw new Error(`${key} is undefined`);
        }
    }

    console.log({
        ...baseData,
        description: description?.slice(0, 50),
    })

    // Create folder for slug
    const folder = `./output/${slug}`;
    fs.mkdirSync(folder, { recursive: true });

    // Save images to folder
    for (const image of images) {
        const response = await fetch(image);
        const blob = await response.blob();
        fs.writeFileSync(`${folder}/${image.split('/').pop()}`, Buffer.from(await blob.arrayBuffer()));
    }

    // Save json file to folder
    fs.writeFileSync(`${folder}/metadata.json`, JSON.stringify({
        ...baseData,
        images: Array.from(images).map((image) => image.split('/').pop()),
    }, null, 2));
}

process.exit(0);
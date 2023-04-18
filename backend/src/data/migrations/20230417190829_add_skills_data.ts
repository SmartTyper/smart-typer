import { Knex } from 'knex';
import axios from 'axios';
import { load, CheerioAPI } from 'cheerio';
import iconv from 'iconv-lite';

const getHTML = async (url: string): Promise<CheerioAPI> => {
  const { data } = await axios.get(url, {
    responseType: 'arraybuffer',
    responseEncoding: 'binary',
  });
  const html = iconv.decode(Buffer.from(data), 'windows-1251');
  return load(html);
};

const checkSkillExists = async (symbols: string): Promise<boolean> => {
  const selector = await getHTML(
    `https://wordfinder.yourdictionary.com/words-with-the-letter/${symbols}`,
  );
  let hasWord = true;

  selector('.body-copy--below-results').each((_, resultsContainer) => {
    selector(resultsContainer)
      .find('p')
      .each((_, paragraph) => {
        if (selector(paragraph).text().includes('There are no')) {
          hasWord = false;
        }
      });
  });

  return hasWord;
};

const getSkills = async (): Promise<string[]> => {
  const alphabet = [...'abcdefghijklmnopqrstuvwxyz'];
  const potentialSkills = [];
  const result = [];

  for (const firstLetter of alphabet) {
    potentialSkills.push(firstLetter);
    for (const secondLetter of alphabet) {
      potentialSkills.push(`${firstLetter}${secondLetter}`);
      for (const thirdLetter of alphabet) {
        potentialSkills.push(`${firstLetter}${secondLetter}${thirdLetter}`);
      }
    }
  }

  for (const skill of potentialSkills) {
    const flag = await checkSkillExists(skill);
    if (flag) {
      result.push(skill);
    }
  }

  return result;
};

export async function up(knex: Knex): Promise<void> {
  const skills = await getSkills();
  const fieldsToInsert = skills.map((name) => ({ name }));
  return knex('skills').insert(fieldsToInsert);
}

export async function down(knex: Knex): Promise<void> {
  knex('skills').truncate();
}

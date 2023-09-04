import { Knex } from 'knex';

const testLessonsData = [
  {
    name: 'Symbols',
    content_type: 'symbols',
    content:
      // eslint-disable-next-line
      'aa ab ac ad ae af ag ah ai aj ak al am an ao ap aq ar as at au av aw ax ay az ba bb bc bd be bf bg bh bi bj bk bl bm bn bo bp bq br bs bt bu bv bw bx by bz ca cb cc cd ce cf cg ch ci cj ck cl cm cn co cp cq cr cs ct cu cv cw cx cy cz da db dc dd de df dg dh di dj dk dl dm dn do dp dq dr ds dt du dv dw dx dy dz ea eb ec ed ee ef eg eh ei ej ek el em en eo ep eq er es et eu ev ew ex ey ez fa fb fc fd fe ff fg fh fi fj fk fl fm fn fo fp fq fr fs ft fu fv fw fx fy fz ga gb gc gd ge gf gg gh gi gj gk gl gm gn go gp gq gr gs gt gu gv gw gx gy gz ha hb hc hd he hf hg hh hi hj hk hl hm hn ho hp hq hr hs ht hu hv hw hx hy hz ia ib ic id ie if ig ih ii ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd je jf jg jh ji jj jk jl jm jn jo jp jq jr js jt ju jv jw jx jy jz ka kb kc kd ke kf kg kh ki kj kk kl km kn ko kp kq kr ks kt ku kv kw kx ky kz la lb lc ld le lf lg lh li lj lk ll lm ln lo lp lq lr ls lt lu lv lw lx ly lz ma mb mc md me mf mg mh mi mj mk ml mm mn mo mp mq mr ms mt mu mv mw mx my mz na nb nc nd ne nf ng nh ni nj nk nl nm nn no np nq nr ns nt nu nv nw nx ny nz oa ob oc od oe of og oh oi oj ok ol om on oo op oq or os ot ou ov ow ox oy oz pa pb pc pd pe pf pg ph pi pj pk pl pm pn po pp pq pr ps pt pu pv pw px py pz qa qb qc qd qe qf qg qh qi qj qk ql qm qn qo qp qq qr qs qt qu qv qw qx qy qz ra rb rc rd re rf rg rh ri rj rk rl rm rn ro rp rq rr rs rt ru rv rw rx ry rz sa sb sc sd se sf sg sh si sj sk sl sm sn so sp sq sr ss st su sv sw sx sy sz ta tb tc td te tf tg th ti tj tk tl tm tn to tp tq tr ts tt tu tv tw tx ty tz ua ub uc ud ue uf ug uh ui uj uk ul um un uo up uq ur us ut uu uv uw ux uy uz va vb vc vd ve vf vg vh vi vj vk vl vm vn vo vp vq vr vs vt vu vv vw vx vy vz wa wb wc wd we wf wg wh wi wj wk wl wm wn wo wp wq wr ws wt wu wv ww wx wy wz xa xb xc xd xe xf xg xh xi xj xk xl xm xn xo xp xq xr xs xt xu xv xw xx xy xz ya yb yc yd ye yf yg yh yi yj yk yl ym yn yo yp yq yr ys yt yu yv yw yx yy yz za zb zc zd ze zf zg zh zi zj zk zl zm zn zo zp zq zr zs zt zu zv zw zx zy zz',
  },
  {
    name: 'Village of Zabara',
    content_type: 'sentences',
    content:
      // eslint-disable-next-line
      'In the enchanting village of Zabara, there was a curious man named Adam. Adam had a remarkable ability to absorb knowledge and was an expert in various fields, including biology, chemistry, and astronomy. He often spent his days studying the complex patterns of the universe.',
  },
  {
    name: 'Local flora',
    content_type: 'sentences',
    content:
      // eslint-disable-next-line
      'One afternoon, while exploring the local flora, Adam discovered a rare flower with vibrant petals. As he bent down to examine it, a buzzing bee flew past him. Intrigued by its movement, Adam followed the bee s path through a dense forest of oak and birch trees.',
  },
  {
    name: 'Heart of the forest',
    content_type: 'sentences',
    content:
      // eslint-disable-next-line
      'In the heart of the forest, Adam stumbled upon an ancient book hidden beneath a pile of leaves. The book contained detailed accounts of mythical creatures and legendary adventures. With a sense of excitement, Adam began reading about the adventures of a brave knight named Arthur.',
  },
  {
    name: 'Atlantis',
    content_type: 'sentences',
    content:
      // eslint-disable-next-line
      'Eager to unravel the secrets of the book, Adam set off on a quest to find the lost city of Atlantis. Equipped with a map, he embarked on a treacherous journey across treacherous terrain. Along the way, he encountered dangerous animals, such as a ferocious tiger and a venomous snake. However, his determination and intelligence helped him overcome every obstacle.',
  },
  {
    name: 'Neighborhood',
    content_type: 'sentences',
    content:
      // eslint-disable-next-line
      'In a quiet neighborhood, young Lily found an old key while playing in her backyard. Intrigued, she embarked on a treasure hunt, following cryptic clues. The key led her to an abandoned house where a secret room awaited her. Inside, she discovered a long-lost family heirloom and a heartfelt letter from her ancestors, revealing a forgotten family history.',
  },
  {
    name: 'Art gallery',
    content_type: 'sentences',
    content:
      // eslint-disable-next-line
      'In an art gallery, Emma came across a peculiar painting. As she stared at it, the characters seemed to come alive, beckoning her to join them. She hesitantly touched the canvas and was instantly transported into the vibrant world of the painting. With newfound courage, Emma helped the characters solve a magical riddle and restore peace to their realm before returning to the real world.',
  },
  {
    name: 'Locket',
    content_type: 'sentences',
    content:
      // eslint-disable-next-line
      'In a dusty attic, young Emily found a beautiful locket hidden among her grandmother s belongings. As she wore it, she was transported back in time to an enchanting Victorian era. Emily met a mysterious young girl named Amelia, who needed her help to solve a family mystery. Through their adventures, Emily unraveled the secrets of the locket and discovered a connection to her own heritage.',
  },
  {
    name: 'Civilization',
    content_type: 'sentences',
    content:
      // eslint-disable-next-line
      'Amelia, a fearless explorer, embarked on a daring expedition to the unexplored jungles of South America. Along her journey, she encountered breathtaking landscapes, encountered exotic wildlife, and faced formidable challenges. With determination and resourcefulness, Amelia overcame obstacles and discovered a hidden ancient civilization, forever changing the world s understanding of history.',
  },
  {
    name: 'Small village',
    content_type: 'sentences',
    content:
      // eslint-disable-next-line
      'In a small village, young Maya possessed a unique ability to catch dreams in her handmade dream catchers. One night, she had a vivid dream that seemed to foretell a disaster. Determined to prevent it, Maya embarked on a journey to warn the village elders. With the power of her dreams and the support of her community, Maya averted the catastrophe and became a revered guardian of dreams.',
  },
  {
    name: 'Oliver',
    content_type: 'sentences',
    content:
      // eslint-disable-next-line
      'In a bustling city, a stray cat named Oliver found solace in a lonely alley. One day, he encountered a young girl named Sophia who showed him kindness and compassion. They formed an unbreakable bond, bringing joy to each other s lives. Together, they embarked on adventures, helping other animals in need and teaching the importance of love and empathy.',
  },
];

export async function up(knex: Knex): Promise<void> {
  const lessons = await knex('lessons')
    .insert(testLessonsData)
    .returning(['id', 'content']);

  await knex.transaction((transaction) => {
    const queries: Knex.Raw<unknown>[] = [];
    lessons.forEach(({ id, content }) => {
      const contentReplaced = content.replace(/'/g, '"');
      const query = knex
        .raw(
          `
          WITH skill_count AS (
            SELECT ${id} AS lesson_id, skills.id AS skill_id, COUNT(matches)
            FROM skills,
            LATERAL regexp_matches('${contentReplaced}', skills.name, 'gi') AS matches
            GROUP BY skills.id
          )
          INSERT INTO lessons_to_skills (lesson_id, skill_id, count)
          SELECT * FROM skill_count
          WHERE count > 0;
          `,
        )
        .transacting(transaction);
      queries.push(query);
    });
    Promise.all(queries).then(transaction.commit).catch(transaction.rollback);
  });
}

export async function down(knex: Knex): Promise<void> {
  knex('lessons').truncate();
  knex('lessons_to_skills').truncate();
}

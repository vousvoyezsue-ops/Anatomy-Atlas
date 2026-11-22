# 같이 만들기

노트에 들어가는 3D 그림은 전부 `src/data/views.js` 한 파일에 정의되어 있어요.
그림을 추가하거나 고칠 때는 이 파일만 바꾸면 되고, 3D 모델(`anatomy.glb`)은 GitHub가 알아서 다시 만들어 배포해요.

## 1. 처음 한 번

**저장소 주인** — GitHub에서 `Anatomy-Atlas` → **Settings → Collaborators → Add people** 로 친구의 GitHub 아이디를 초대해요.
친구는 이메일로 온 초대를 수락하면 돼요.

**친구** — 내 컴퓨터에 받아서 실행:

```
git clone https://github.com/vousvoyezsue-ops/Anatomy-Atlas.git
cd Anatomy-Atlas
npm install
npm run fetch-model   # 지금 공개된 3D 모델을 받아옴
npm run dev
```

그림 하나 보기: `http://localhost:5173/embed.html?v=celiac-trunk`

## 2. 그림 추가하는 흐름

1. 최신으로 맞추고 내 브랜치 만들기
   ```
   git checkout master && git pull
   git checkout -b topic-16-kidney
   ```
2. `src/data/views.js` 에 그림 추가 (아래 3번)
3. 올리고 Pull Request 열기
   ```
   git add src/data/views.js
   git commit -m "Add kidney figures"
   git push -u origin topic-16-kidney
   ```
   GitHub에서 **Compare & pull request** 를 누르면 돼요.
4. PR을 열면 GitHub가 3D 모델과 사이트를 **자동으로 빌드해 봐요** (2–3분).
   초록 체크 ✓ 가 뜨면 문제없다는 뜻이에요. 빨간 ✗ 면 *Details* 에서 이유를 볼 수 있어요
   (예: `no mesh for FMA…` = 없는 FMA id).
5. 서로 확인하고 **Merge** → 몇 분 뒤 사이트에 반영돼요.

같은 그림을 두 사람이 동시에 고치지 않도록, 토픽(노트) 단위로 나눠 맡는 걸 추천해요.

## 3. 그림 하나의 구조

```js
'celiac-trunk': {
  title: 'Branches of the celiac trunk',   // 그림 제목 (영어)
  turn: 0,       // 처음 보는 각도: 좌우 회전 (도). 0 = 정면, 90 = 오른쪽에서, 180 = 뒤
  tilt: 10,      // 위아래 기울기 (도). + = 위에서, − = 아래에서
  spin: false,   // 가만히 있으면 천천히 돌지
  groups: [      // 색칠되는 구조 = 범례 한 줄씩
    { label: 'Left gastric a.', ko: '왼위동맥', colour: 'rose', parts: ['FMA14768'] },
    { label: 'Splenic a.', ko: '지라동맥', colour: 'slate', parts: SPLENIC_A },
  ],
  soft: [...STOMACH, ...SPLEEN],   // 흐리게 보이는 주변 장기 (위치 참고용)
  frame: [...STOMACH, ...DUODENUM], // 화면에 맞춰 넣을 범위 (없으면 groups 전체)
  zoom: 1.35,    // 1보다 크면 크게
},
```

- **색** (`colour`): rose · paleRose · deepRose · gold · deepGold · sage · deepSage · sky · paleSky · deepSky · slate · ivory · cartilage
- **parts** 는 BodyParts3D의 FMA id 목록이에요. 자주 쓰는 묶음은 파일 위쪽에 상수로 있어요 (`STOMACH`, `PORTAL_V`, `RIBS` …).
- 범례는 짧게: 한 그림에 5–7줄 정도가 보기 좋아요.

## 4. FMA id 찾기

[`docs/parts.tsv`](docs/parts.tsv) 에 모델로 쓸 수 있는 구조 2천여 개가 이름순으로 있어요.
GitHub에서 열고 영어 이름으로 찾으면 돼요 (예: `Splenic artery` → `FMA14773`).
여기 없는 id는 빌드에서 `no mesh for …` 로 알려줘요.

## 5. 내 컴퓨터에서 모델까지 만들어 보기 (선택)

새 구조를 넣은 그림을 PR 전에 직접 보고 싶을 때:

```
npm run sources   # BodyParts3D 원본 받기 (처음 한 번, 약 250 MB)
npm run models    # public/anatomy.glb 다시 만들기 (1–2분)
npm run dev
```

`anatomy.glb` 는 git에 올리지 않아요 (자동으로 제외됨). 배포용은 GitHub가 만들어요.

## 6. 노트에 넣기

```html
<iframe src="https://vousvoyezsue-ops.github.io/Anatomy-Atlas/embed.html?v=celiac-trunk" loading="lazy"></iframe>
```

---

3D 모델: BodyParts3D © DBCLS, CC BY-SA 2.1 JP. 이 저장소의 모델도 같은 라이선스로 공유돼요.

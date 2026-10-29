window.SURVEY_TEXT=String.raw`
# ======================================================================
#  설문 문구 파일 — 화면에 나오는 글은 전부 여기서 고치면 됩니다.
# ======================================================================
#  [항목이름]   항목의 시작. 프로그램이 이 이름으로 찾으니 이름은 바꾸지 마세요.
#  ko: …        한국어 문장
#  en: …        영어 문장
#    | …        바로 위 문장에 이어서, 줄을 바꿔 쓰기  ( | 만 쓰면 빈 줄 )
#  {이름}       프로그램이 값을 채워 넣는 자리. 지우거나 철자를 바꾸지 마세요.
#  **굵게**     굵은 글씨
#  # …          메모 (화면에 안 나와요)
#
#  - 비어 있어도 되는 항목은 "ko:" 처럼 내용 없이 두면 돼요 (예: 한국어 설문에는 국적 질문이 없어요).
#  - 키보드 숫자 1 왼쪽의 역따옴표 문자, 그리고 달러 기호 바로 뒤에 여는 중괄호를 붙인 글자는 쓰지 마세요.
#  - 고친 뒤 페이지를 열었을 때 맨 위에 빨간 안내 줄이 보이면 형식이 틀린 곳이 있다는 뜻이에요.
#  - 주의: 응답 이유(Q2 보기)의 한국어 문구는 제출 데이터의 reason_label 로도 저장돼요.
#    설문을 이미 받고 있다면 문항·보기 문구는 신중하게 바꿔 주세요.


# ----------------------------------------------------------------------
# 1. 언어 선택 화면 (두 언어가 한 화면에 같이 나와요)
# ----------------------------------------------------------------------
[pickHeading]
ko: 언어
en: Language

[pickSub]
ko: 언어를 선택해 주세요
en: Choose your language

# 한국어 선택지: 큰 글씨 = ko, 작은 글씨 = en
[pickKo]
ko: 한국어
en: Korean

# 영어 선택지: 큰 글씨 = en, 작은 글씨 = ko
[pickEn]
ko: 영어
en: English

[pickGo]
ko: 한국어로 시작하기
en: Continue in English


# ----------------------------------------------------------------------
# 2. 안내봇: 인사 · 연구 소개 · 동의
# ----------------------------------------------------------------------
[hello]
ko: 안녕하세요! CMC(컴퓨터 매개 커뮤니케이션) 수업 연구를 위한 설문에 와 주셔서 고마워요.
en: Hi there! Thanks for coming to take our survey for a CMC (computer-mediated communication) class research project.

[about]
ko: 이 연구는 메신저로 보낸 메시지에 답장이 없을 때, 기다린 시간과 ‘읽음’ 여부에 따라 사람들이 그 상황을 어떻게 느끼고 해석하는지 알아보려고 해요.
en: This study explores how people feel about, and make sense of, getting no reply to a message they've sent, depending on how long they've been waiting and whether the message shows as “read.”

[steps]
ko: 진행은 이렇게 돼요.
  | ① 저와 대화하며 기본 질문 몇 가지에 답하기
  | ② 메신저 화면 4가지 상황을 보고, 상황마다 친구·연인·가족·교수님 네 관계에 대해 짧게 답하기 (질문 2개씩)
  |
  | 전체 약 5분 걸려요.
en: Here's how it works:
  | ① Chat with me and answer a few basic questions
  | ② Look at a messenger screen in 4 different situations. For each one, answer briefly for four relationships: a friend, a romantic partner, a family member, and a professor (2 questions each)
  |
  | The whole thing takes about 5 minutes.

[privacy]
ko: 수집하는 정보는 나이, 성별, 전공, 평소 답장 습관, 그리고 설문 응답이에요. 이름과 학번은 받지 않고, 응답은 무작위로 만든 익명 ID로만 저장돼요.
  |
  | 모은 응답은 이 수업 연구의 분석에만 쓰이고, 원하지 않으면 언제든 창을 닫아 중단할 수 있어요.
en: We'll collect your age, gender, nationality, major, how quickly you usually reply to messages, and your survey answers. We won't ask for your name or student ID, and your answers are saved only under a randomly generated anonymous ID.
  |
  | Your answers will be used only for analysis in this class research project, and you can stop at any time just by closing this window.

[consentQ]
ko: 위 내용을 읽고 연구 참여에 동의하시나요?
en: Now that you've read this, do you agree to take part in this study?

[agree]
ko: 동의합니다
en: I agree

[disagree]
ko: 동의하지 않습니다
en: I don't agree

[declined]
ko: 알겠습니다. 응답은 저장되지 않았고 설문을 여기서 마칠게요. 시간 내 주셔서 고마워요.
en: Okay, no problem. Nothing has been saved, and the survey ends here. Thanks for your time.

[declinedHint]
ko: 설문이 종료되었습니다. 이 창을 닫으셔도 됩니다.
en: The survey has ended. You can close this window now.

[reconsider]
ko: 다시 생각해 볼게요
en: Let me reconsider


# ----------------------------------------------------------------------
# 3. 기본 질문: 나이 · 성별 · 국적(영어만) · 전공 · 답장 습관 · 신경 쓰이기 시작하는 시간
# ----------------------------------------------------------------------
[age]
ko: 고마워요! 먼저 기본 질문을 드릴게요.
  | 나이를 숫자로 입력해 주세요. (만 나이)
en: Thanks! Let's start with a few basic questions.
  | How old are you? Please enter your age as a number.

# 답 수정 단계에서 다시 물을 때
[ageAgain]
ko: 나이를 숫자로 입력해 주세요. (만 나이)
en: How old are you? Please enter your age as a number.

[agePh]
ko: 예: 21
en: e.g., 21

[ageErrNum]
ko: 나이를 숫자로만 입력해 주세요.
en: Please enter your age using numbers only.

[ageErrRange]
ko: 15에서 99 사이의 숫자로 입력해 주세요.
en: Please enter a number between 15 and 99.

# 응답자 말풍선에 보이는 나이
[ageEcho]
ko: {n}세
en: {n}

[gender]
ko: 성별을 골라 주세요.
en: Please choose your gender.

# 성별 보기 (데이터에는 언어와 상관없이 여성/남성/응답하지 않음 으로 저장돼요)
[genderF]
ko: 여성
en: Female

[genderM]
ko: 남성
en: Male

[genderNone]
ko: 응답하지 않음
en: Prefer not to say

# 국적 — 영어 설문에서만 물어요
[nat]
ko:
en: What's your nationality?
  | If you have more than one, pick the one you identify with most.

[natLabel]
ko:
en: Nationality

[natPh]
ko:
en: Type a country

[natGroup]
ko:
en: Matching countries

[natHintEmpty]
ko:
en: Start typing, then tap your country.

[natCount1]
ko:
en: 1 match. Tap it to choose.

[natCount]
ko:
en: {n} matches. Tap one to choose.

[natMore]
ko:
en: Showing 6 of {n} matches. Keep typing or tap one.

[natNone]
ko:
en: Not in the list? You can use what you typed.

[natUse]
ko:
en: Use “{text}”

[natPrefer]
ko:
en: Prefer not to say

[natErrPick]
ko:
en: Please tap one of the options above.

[natErrEmpty]
ko:
en: Please type your country, or choose “Prefer not to say.”

[major]
ko: 전공을 알려 주세요. (복수전공이면 주전공만 적어도 돼요)
en: What's your major? (If you have a double major, just your main one is fine.)

[majorPh]
ko: 예: 경영학
en: e.g., Business

[majorErrEmpty]
ko: 전공을 입력해 주세요.
en: Please enter your major.

[majorErrLong]
ko: 40자 이내로 입력해 주세요.
en: Please keep it to 40 characters or fewer.

[habit]
ko: 평소에 메시지를 받으면 보통 얼마나 지나서 답장하나요?
  | 숫자를 쓰고 단위를 골라 주세요.
en: When you get a message, how long does it usually take you to reply?
  | Type a number and pick a unit.

[habitHint]
ko: 바로 답장하는 편이면 0을 입력하세요.
en: If you usually reply right away, enter 0.

[thrIntro]
ko: 이제 상대별로 여쭤볼게요. 내가 메시지를 보냈을 때, 답장이 얼마나 늦어지면 신경 쓰이기 시작하나요?
en: Now let's go person by person. When you send someone a message, how late does their reply have to be before it starts to be on your mind?

[thrAssume]
ko: 지금 연인처럼 해당하는 사람이 없다면, 그런 사람이 한 명 있다고 가정하고 답해 주세요.
en: If you don't currently have someone in one of these roles (a romantic partner, for example), please answer as if you did.

# 답 수정 단계에서 다시 물을 때
[thrAgain]
ko: 다시 여쭤볼게요. 내가 메시지를 보냈을 때, 답장이 얼마나 늦어지면 신경 쓰이기 시작하나요?
en: Let me ask again. When you send someone a message, how late does their reply have to be before it starts to be on your mind?

# 상대별 질문("가까운 친구에게 보냈을 때는요?")은 아래 7번 관계 항목의 thrAsk 에 있어요.


# ----------------------------------------------------------------------
# 4. 시간 입력 칸 (숫자 + 단위)
# ----------------------------------------------------------------------
[durPh]
ko: 숫자
en: Number

[durLabel]
ko: 시간 입력
en: Amount of time

[unitGroup]
ko: 단위
en: Unit

# 단위 버튼
[unitMin]
ko: 분
en: min

[unitHour]
ko: 시간
en: hours

[unitDay]
ko: 일
en: days

# 숫자가 1일 때 말풍선에 쓰는 단위 (영어 단수형)
[unitMin1]
ko: 분
en: min

[unitHour1]
ko: 시간
en: hour

[unitDay1]
ko: 일
en: day

# 응답자 말풍선: {v} = 숫자, {unit} = 단위
[durEcho]
ko: {v}{unit}
en: {v} {unit}

[durErrNum]
ko: 숫자로 입력해 주세요. 예: 30분이면 30을 쓰고 ‘분’을 고르세요.
en: Please enter a number. For example, for 30 minutes, type 30 and choose “min” as the unit.

[durErrMin0]
ko: 0 이상의 숫자를 입력해 주세요.
en: Please enter a number that's 0 or more.

[durErrPos]
ko: 0보다 큰 숫자를 입력해 주세요.
en: Please enter a number greater than 0.

[durErrMax]
ko: 60일 이내로 입력해 주세요.
en: Please enter 60 days or less.

[durErrUnit]
ko: 단위를 골라 주세요.
en: Please choose a unit.


# ----------------------------------------------------------------------
# 5. 답 확인 · 수정
# ----------------------------------------------------------------------
# {thr} 자리에는 아래 summaryThr 줄이 관계 4개만큼 들어가요.
[summary]
ko: 지금까지 답한 내용이에요.
  |
  | 나이: {age}
  | 성별: {gender}
  | 전공: {major}
  | 평소 답장까지 걸리는 시간: {habit}
  |
  | 답장이 늦어 신경 쓰이기 시작하는 때
  | {thr}
  |
  | 이 내용이 맞나요?
en: Here's a quick summary of your answers.
  |
  | Age: {age}
  | Gender: {gender}
  | Nationality: {nationality}
  | Major: {major}
  | Usual reply time: {habit}
  |
  | When a late reply starts to be on your mind
  | {thr}
  |
  | Is everything correct?

[summaryThr]
ko: · {name}: {time}
en: · {name}: {time}

[confirmYes]
ko: 맞아요
en: That's right

[confirmEdit]
ko: 수정할게요
en: Edit an answer

[whichEdit]
ko: 어떤 답을 고칠까요?
en: Which answer would you like to change?

[editAge]
ko: 나이
en: Age

[editGender]
ko: 성별
en: Gender

[editNationality]
ko:
en: Nationality

[editMajor]
ko: 전공
en: Major

[editHabit]
ko: 평소 답장 시간
en: Usual reply time

[editThr]
ko: 신경 쓰이는 때 · {name}
en: Late reply · {name}

[editCancel]
ko: 그대로 둘게요
en: Never mind


# ----------------------------------------------------------------------
# 6. 메신저 상황 시작 전 안내
# ----------------------------------------------------------------------
[toScenario]
ko: 기본 질문은 끝났어요! 이제부터는 실제 메신저 화면이 나와요. 화면 속 메시지는 응답자 본인이 보낸 것이고, 화면과 함께 나오는 질문에 답하면 돼요.
en: That's it for the basic questions! Next, you'll see real-looking messenger screens. The message on each screen is one you sent. Just answer the questions that come with it.

[fourSits]
ko: 상황은 모두 4가지이고, 각각 앞 상황과 이어지지 않는 별개의 장면이에요.
en: There are 4 situations in total, and each one is a separate scene that doesn't continue from the one before.

# 노란 ‘1’ 설명 — 영어 설문에만 나와요 (비워 두면 안 나와요)
[oneHint]
ko:
en: One thing to know about this messenger: a small yellow “1” next to a message you sent means the other person hasn't read it yet. When they read it, the “1” disappears.

[startScen]
ko: 메신저 상황 시작하기
en: Start situation 1


# ----------------------------------------------------------------------
# 7. 관계 4가지
#    chip    = 짧은 이름 (진행 표시, 답 확인 목록)
#    contact = 메신저 화면 맨 위 대화방 이름
#    msg     = 내가 보낸 메시지
#    think   = 상황 화면 안내 문장의 앞부분 (**굵게** 쓴 부분이 문항이 바뀔 때 반짝여요)
#    thrAsk  = 기본 질문에서 상대별로 묻는 말
# ----------------------------------------------------------------------
[rel.friend.chip]
ko: 가까운 친구
en: Close friend

[rel.friend.contact]
ko: 친한 친구
en: Close Friend

[rel.friend.msg]
ko: 이번 주에 잠깐 얘기할 수 있어?
en: Are you free to talk for a bit this week?

[rel.friend.think]
ko: **가까운 친구** 한 사람을 떠올려 주세요.
en: Think of one specific **close friend**.

[rel.friend.thrAsk]
ko: ‘가까운 친구’에게 보냈을 때는요?
en: What about when you message a close friend?

[rel.partner.chip]
ko: 연인
en: Partner

[rel.partner.contact]
ko: 애인 ♥
en: Babe ♥

[rel.partner.msg]
ko: 이번 주에 잠깐 얘기할 수 있어?
en: Are you free to talk for a bit this week?

[rel.partner.think]
ko: **연인** 한 사람을 떠올려 주세요. 지금 연인이 없다면 있다고 가정해도 돼요.
en: Think of your **romantic partner**. If you don't have one right now, it's fine to imagine that you do.

[rel.partner.thrAsk]
ko: ‘연인’에게 보냈을 때는요?
en: What about when you message a romantic partner?

[rel.family.chip]
ko: 가족
en: Family

[rel.family.contact]
ko: 가족
en: Family

[rel.family.msg]
ko: 이번 주에 잠깐 얘기할 수 있어?
en: Are you free to talk for a bit this week?

[rel.family.think]
ko: **가족** 한 사람을 떠올려 주세요.
en: Think of one specific **family member**.

[rel.family.thrAsk]
ko: ‘가족’에게 보냈을 때는요?
en: What about when you message a family member?

[rel.professor.chip]
ko: 교수님
en: Professor

[rel.professor.contact]
ko: 교수님
en: Professor

[rel.professor.msg]
ko: 이번 주에 잠깐 이야기할 수 있을까요?
en: Would you have a few minutes to talk this week?

[rel.professor.think]
ko: **교수님** 한 사람을 떠올려 주세요.
en: Think of one specific **professor**.

[rel.professor.thrAsk]
ko: ‘교수님’에게 보냈을 때는요?
en: What about when you message a professor?


# ----------------------------------------------------------------------
# 8. 상황 4가지 (모든 응답자에게 같은 가상의 시계)
#    순서와 조건은 고정이에요:  상황1 = 2시간·읽음,  상황2 = 2시간·안 읽음,
#                               상황3 = 하루·안 읽음,  상황4 = 하루·읽음
#    sentDay   = 대화창 가운데 날짜          sentTime = 말풍선 옆 시각
#    nowDate   = 휴대폰 상단 날짜            nowTime  = 휴대폰 상단 시각
#    sentShort = 상황 요약 '보낸 시각'       nowShort = 상황 요약 '지금'
#    summary   = 상황 요약 아랫줄            guide    = 안내 문장 뒷부분 (관계 think 다음에 붙어요)
#    q1ctx     = Q1 질문 위 작은 글씨
# ----------------------------------------------------------------------
[sit1.sentDay]
ko: 2026년 10월 14일 수요일
en: Wednesday, October 14, 2026

[sit1.sentTime]
ko: 오후 1:10
en: 1:10 PM

[sit1.nowDate]
ko: 10월 14일 (수)
en: Wed, Oct 14

[sit1.nowTime]
ko: 오후 3:10
en: 3:10 PM

[sit1.sentShort]
ko: 오늘 오후 1:10
en: Today 1:10 PM

[sit1.nowShort]
ko: 오늘 오후 3:10
en: Today 3:10 PM

[sit1.summary]
ko: **2시간째 답장 없음** · 상대가 메시지를 읽었어요 (‘1’이 사라짐)
en: **No reply for 2 hours** · They've read your message (the “1” has disappeared)

[sit1.guide]
ko: 그 사람에게 이 메시지를 보낸 지 **2시간이** 지났는데, 읽고도 답장이 없어요.
en: It's been **2 hours** since you sent them this message. They've read it, but there's no reply.

[sit1.q1ctx]
ko: 보낸 지 2시간, 읽었지만 답장이 없는
en: Sent 2 hours ago · read, but no reply

[sit2.sentDay]
ko: 2026년 10월 14일 수요일
en: Wednesday, October 14, 2026

[sit2.sentTime]
ko: 오후 1:10
en: 1:10 PM

[sit2.nowDate]
ko: 10월 14일 (수)
en: Wed, Oct 14

[sit2.nowTime]
ko: 오후 3:10
en: 3:10 PM

[sit2.sentShort]
ko: 오늘 오후 1:10
en: Today 1:10 PM

[sit2.nowShort]
ko: 오늘 오후 3:10
en: Today 3:10 PM

[sit2.summary]
ko: **2시간째 답장 없음** · 상대가 아직 읽지 않았어요 (‘1’이 남아 있음)
en: **No reply for 2 hours** · They haven't read it yet (the “1” is still showing)

[sit2.guide]
ko: 그 사람에게 이 메시지를 보낸 지 **2시간이** 지났는데, 아직 읽지 않았고 답장이 없어요.
en: It's been **2 hours** since you sent them this message. They haven't read it yet, and there's no reply.

[sit2.q1ctx]
ko: 보낸 지 2시간, 아직 읽지 않았고 답장이 없는
en: Sent 2 hours ago · not read yet, no reply

[sit3.sentDay]
ko: 2026년 10월 13일 화요일
en: Tuesday, October 13, 2026

[sit3.sentTime]
ko: 오후 3:10
en: 3:10 PM

[sit3.nowDate]
ko: 10월 14일 (수)
en: Wed, Oct 14

[sit3.nowTime]
ko: 오후 3:10
en: 3:10 PM

[sit3.sentShort]
ko: 어제 오후 3:10
en: Yesterday 3:10 PM

[sit3.nowShort]
ko: 오늘 오후 3:10
en: Today 3:10 PM

[sit3.summary]
ko: **하루째 답장 없음** · 상대가 아직 읽지 않았어요 (‘1’이 남아 있음)
en: **No reply for a day** · They haven't read it yet (the “1” is still showing)

[sit3.guide]
ko: 그 사람에게 이 메시지를 보낸 지 **하루가** 지났는데, 아직 읽지 않았고 답장이 없어요.
en: It's been **a day** since you sent them this message. They haven't read it yet, and there's no reply.

[sit3.q1ctx]
ko: 보낸 지 하루, 아직 읽지 않았고 답장이 없는
en: Sent a day ago · not read yet, no reply

[sit4.sentDay]
ko: 2026년 10월 13일 화요일
en: Tuesday, October 13, 2026

[sit4.sentTime]
ko: 오후 3:10
en: 3:10 PM

[sit4.nowDate]
ko: 10월 14일 (수)
en: Wed, Oct 14

[sit4.nowTime]
ko: 오후 3:10
en: 3:10 PM

[sit4.sentShort]
ko: 어제 오후 3:10
en: Yesterday 3:10 PM

[sit4.nowShort]
ko: 오늘 오후 3:10
en: Today 3:10 PM

[sit4.summary]
ko: **하루째 답장 없음** · 상대가 메시지를 읽었어요 (‘1’이 사라짐)
en: **No reply for a day** · They've read your message (the “1” has disappeared)

[sit4.guide]
ko: 그 사람에게 이 메시지를 보낸 지 **하루가** 지났는데, 읽고도 답장이 없어요.
en: It's been **a day** since you sent them this message. They've read it, but there's no reply.

[sit4.q1ctx]
ko: 보낸 지 하루, 읽었지만 답장이 없는
en: Sent a day ago · read, but no reply


# ----------------------------------------------------------------------
# 9. 상황 화면의 질문 — Q1 (1~10점) · Q2 (답장이 없는 이유)
# ----------------------------------------------------------------------
[q1]
ko: 이 상황이 얼마나 신경 쓰이나요?
en: How much would this situation be on your mind?

[anchorLow]
ko: 1 전혀 신경 쓰이지 않음
en: 1 Not on my mind at all

[anchorHigh]
ko: 10 매우 신경 쓰임
en: 10 Very much on my mind

# 화면 낭독기가 읽는 점수 이름
[scaleLabel]
ko: {n}점
en: {n} out of 10

[q2]
ko: 답장이 없는 가장 그럴듯한 이유는 무엇이라고 생각하나요?
en: What do you think is the most likely reason they haven't replied?

[q2small]
ko: 하나만 선택
en: Choose one

# Q2 보기 — 상대가 읽은 상황 (상황 1·4)
[reason.read.busy]
ko: 바빠서 아직 답장하지 못했다
en: They're busy and haven't been able to reply yet

[reason.read.deliberating]
ko: 답장을 신중하게 생각하고 있다
en: They're thinking carefully about how to reply

[reason.read.postponed_forgot]
ko: 읽고 나서 답장을 미루거나 잊었다
en: They read it, then put off replying or forgot

[reason.read.unwilling]
ko: 답장하고 싶지 않다
en: They don't want to reply

[reason.read.unsure]
ko: 잘 모르겠다
en: I'm not sure

[reason.read.other]
ko: 기타(직접 입력)
en: Other (please specify)

# Q2 보기 — 상대가 아직 안 읽은 상황 (상황 2·3)
[reason.unread.not_seen]
ko: 메시지가 온 것을 아직 못 봤다
en: They haven't noticed the message yet

[reason.unread.busy_unopened]
ko: 바빠서 대화방을 열지 못했다
en: They're busy and haven't been able to open the chat

[reason.unread.preview_later]
ko: 알림 미리보기로 봤지만 나중에 답장하려 한다
en: They saw it in the notification preview but plan to reply later

[reason.unread.avoid_opening]
ko: 답장하고 싶지 않아 일부러 열지 않았다
en: They don't want to reply, so they're deliberately not opening it

[reason.unread.unsure]
ko: 잘 모르겠다
en: I'm not sure

[reason.unread.other]
ko: 기타(직접 입력)
en: Other (please specify)

[otherPh]
ko: 이유를 직접 적어 주세요
en: Type your reason

[errQ1]
ko: 1~10점 중 하나를 골라 주세요.
en: Please choose a number from 1 to 10.

[errQ2]
ko: 가장 그럴듯한 이유를 하나 골라 주세요.
en: Please choose the most likely reason.

[errOther]
ko: ‘기타’를 골랐다면 이유를 직접 적어 주세요.
en: If you chose “Other,” please type your reason.


# ----------------------------------------------------------------------
# 10. 상황 화면의 나머지 글
# ----------------------------------------------------------------------
[progSit]
ko: 상황 {n} / 4
en: Situation {n} of 4

[progCount]
ko: {i} / {total}
en: {i} / {total}

# 화면 낭독기가 문항이 바뀔 때 읽는 말
[live]
ko: {i} / {total} · {name}
en: {i} of {total} · {name}

# 각 상황의 첫 문항에 나오는 안내 (notice1 = 상황 1, noticeNew = 상황 2~4)
[notice1]
ko: 메신저 화면을 보고 답해 주세요. 상대가 바뀌면 대화방 이름과 말투만 달라져요.
en: Please answer based on the messenger screen. When the person changes, only the chat name and the tone of the message change. Remember: a “1” next to your message means it hasn't been read yet.

[noticeNew]
ko: 새로운 상황이에요. 앞 상황과 이어지지 않는 별개의 장면으로 봐 주세요.
en: This is a new situation. Please treat it as a separate scene, not a continuation of the previous one.

[sentAt]
ko: 보낸 시각
en: Sent

[now]
ko: 지금
en: Now

[phoneLabel]
ko: 메신저 화면: {contact}에게 보낸 메시지
en: Messenger screen: message sent to {contact}

[unread]
ko: 읽지 않음
en: Unread

[fakeInput]
ko: 메시지 입력
en: Type a message

[prev]
ko: 이전
en: Back

[next]
ko: 다음
en: Next

[submit]
ko: 제출하기
en: Submit

[saving]
ko: 저장 중…
en: Saving…

[savingHint]
ko: 최대 1분 정도 걸릴 수 있어요
en: This can take up to a minute.

[resubmit]
ko: 다시 제출하기
en: Submit again

[submitInvalid]
ko: 응답 형식에 문제가 있어 저장하지 못했어요. 연구자에게 알려 주세요.
en: We couldn't save your answers because of a formatting problem. Please let the researchers know.

[submitFail]
ko: 응답이 아직 저장되지 않았어요. 인터넷 연결을 확인한 뒤 ‘다시 제출하기’를 눌러 주세요. 입력한 답은 그대로 남아 있어요. (오류: {error})
en: Your answers haven't been saved yet. Check your internet connection, then tap “Submit again.” Your answers are still here. (Error: {error})


# ----------------------------------------------------------------------
# 11. 끝 화면
# ----------------------------------------------------------------------
[thanks]
ko: 참여해 주셔서 감사합니다
en: Thank you for taking part!

[saved]
ko: 응답이 안전하게 저장되었어요. 이제 이 창을 닫으셔도 됩니다.
en: Your answers have been saved. You can close this window now.

[respId]
ko: 응답 ID {id}
en: Response ID {id}

[deleteNote]
ko: 나중에 응답 삭제를 원하면 이 ID를 연구자에게 알려 주세요.
en: If you'd like your answers deleted later, send this ID to the researchers.

[already]
ko: 이 기기에서는 이미 응답을 제출하셨어요. 참여해 주셔서 감사합니다!
en: You've already submitted a response on this device. Thanks so much for taking part!


# ----------------------------------------------------------------------
# 12. 이어서 하기 (새로고침 후 진행 중이던 설문이 있을 때)
# ----------------------------------------------------------------------
[resumeTitle]
ko: 진행 중이던 설문이 있어요 ({done}/{total} 완료)
en: You have a survey in progress ({done}/{total} done)

[resumeNote]
ko: 처음부터 다시 하면 저장된 답이 지워져요.
en: If you start over, your saved answers will be cleared.

[resumeGo]
ko: 이어서 하기
en: Continue

# 다른 언어로 시작했던 설문을 이어 할 때
[resumeOther]
ko: 처음에 영어(English)로 시작한 설문이라 영어로 이어서 진행돼요.
en: You started this survey in Korean (한국어), so it will continue in Korean.

[resumeGoOther]
ko: 영어로 이어서 하기
en: Continue in Korean

[resumeRestart]
ko: 처음부터 다시 하기
en: Start over


# ----------------------------------------------------------------------
# 13. 저장 서버 연결 · 오류 안내
# ----------------------------------------------------------------------
[connecting]
ko: 저장 서버에 연결하는 중이에요… 처음에는 1분 정도 걸릴 수 있어요.
en: Connecting to the server that saves your answers… This can take about a minute the first time.

[connectingSec]
ko: 저장 서버에 연결하는 중이에요… {s}초 (처음에는 1분 정도 걸릴 수 있어요)
en: Connecting to the server that saves your answers… {s}s (this can take about a minute the first time)

[reconnecting]
ko: 저장 서버에 연결하는 중이에요…
en: Connecting to the server that saves your answers…

[slowServer]
ko: 저장 서버 연결이 오래 걸리고 있어요. 잠시 후 다시 시도해 주세요.
en: It's taking a while to connect to the server. Please try again in a moment.

[retry]
ko: 다시 시도
en: Try again

[errDetail]
ko: 오류 내용: {detail}
en: Error details: {detail}

[serverFail]
ko: 지금은 응답을 저장할 서버에 연결할 수 없어서 설문을 진행할 수 없어요. 인터넷 연결을 확인한 뒤 페이지를 새로고침해 주세요. 문제가 계속되면 연구자에게 알려 주세요.
en: We can't connect to the server that saves responses right now, so the survey can't continue. Please check your internet connection and refresh the page. If the problem continues, please let the researchers know.

[ended]
ko: 설문이 종료되었습니다.
en: The survey has ended.

[errFormat]
ko: 응답 형식 오류
en: Unexpected server response

[errTimeout]
ko: 시간 초과
en: Timed out

[errNetwork]
ko: 네트워크 오류
en: Network error

[errConfirm]
ko: 저장 확인 실패
en: Couldn't confirm the save

[errOffline]
ko: 인터넷 연결 없음
en: No internet connection


# ----------------------------------------------------------------------
# 14. 기타 화면 요소
# ----------------------------------------------------------------------
# 브라우저 탭 제목
[title]
ko: 읽씹·안읽씹 설문
en: Message Reply Survey

# 안내봇 대화창 맨 위 이름 / 가운데 회색 날짜 자리 / 봇 이름
[chatTitle]
ko: 설문 안내
en: Survey Guide

[dayPill]
ko: 설문 참여 안내
en: About this survey

[botName]
ko: 설문 안내봇
en: Survey Guide Bot

[typing]
ko: 입력 중
en: Typing…

# 말풍선 옆 시각 (지금 시각): {h} = 시, {m} = 분
[clockAM]
ko: 오전 {h}:{m}
en: {h}:{m} AM

[clockPM]
ko: 오후 {h}:{m}
en: {h}:{m} PM

[send]
ko: 전송
en: Send

[newMsg]
ko: 새 메시지 ↓
en: New message ↓
`;

# Supabase 이메일 인증 설정

## 1. 데이터베이스 보안 적용

Supabase Dashboard에서 `SQL Editor`를 열고 다음 파일의 전체 내용을 실행합니다.

`supabase/email_auth_schema.sql`

이 SQL은 사용자별 일정 테이블, RLS 보안 정책, 앱 내 회원 탈퇴 기능을 만듭니다.

## 2. 이메일 인증 활성화

1. `Authentication` → `Providers` → `Email`로 이동합니다.
2. Email provider를 활성화합니다.
3. `Confirm email`을 활성화합니다.
4. 저장합니다.

`Confirm email`이 꺼져 있으면 인증 메일을 확인하지 않아도 가입과 동시에 로그인되므로 반드시 켜야 합니다.

## 3. 인증 URL 설정

`Authentication` → `URL Configuration`에서 Site URL을 접근 가능한 HTTPS 주소로 설정합니다. 초기에는 아래 공개 저장소 주소를 사용할 수 있습니다.

`https://github.com/heesunghwang/haru-calendar`

사용자는 인증 메일 링크를 누른 뒤 HARU 앱으로 돌아와 이메일과 비밀번호로 로그인합니다.

## 4. 동작 확인

1. HARU에서 회원가입을 선택합니다.
2. 이메일과 8자 이상의 비밀번호를 입력합니다.
3. 받은 인증 메일의 링크를 누릅니다.
4. 모바일 HARU에 로그인하고 일정을 추가합니다.
5. Windows HARU에 같은 계정으로 로그인한 뒤 새로고침합니다.
6. 회원 탈퇴를 눌러 Authentication의 사용자와 `user_calendars` 행이 삭제되는지 확인합니다.


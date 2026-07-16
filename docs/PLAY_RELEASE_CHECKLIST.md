# HARU Play 스토어 출시 체크리스트

## 코드 및 빌드

- [x] 패키지명 `com.haru.calendar` 확정
- [x] `targetSdk 35` 적용
- [x] 앱 버전 `1.1.0` / versionCode `12`
- [x] 앱 백업 비활성화 및 WebView 디버깅 차단
- [x] 12자리 동기화 보안 코드 적용
- [x] release AAB 빌드 작업 구성
- [ ] 업로드 키스토어 생성
- [ ] GitHub Actions 서명용 Secrets 등록
- [ ] 서명된 `app-release.aab` 생성 확인

## Play Console

- [ ] 개인 개발자 계정 생성 및 본인 인증
- [ ] 앱 이름 `HARU`, 유형 `앱`, 가격 `무료`로 생성
- [ ] Play App Signing 약관 동의
- [ ] 앱 액세스, 광고, 콘텐츠 등급, 대상 연령 설문 작성
- [ ] 데이터 보안 설문 작성
- [ ] 개인정보처리방침 URL 등록
- [ ] 앱 아이콘, 휴대전화 스크린샷, 그래픽 이미지 등록
- [ ] 비공개 테스트에 AAB 배포
- [ ] 테스터 12명 이상이 14일 연속 참여
- [ ] 프로덕션 액세스 신청 및 정식 출시

## GitHub 서명 Secrets

- `HARU_KEYSTORE_BASE64`: 업로드 키스토어 파일의 Base64 값
- `HARU_KEYSTORE_PASSWORD`: 키스토어 비밀번호
- `HARU_KEY_ALIAS`: 업로드 키 별칭
- `HARU_KEY_PASSWORD`: 업로드 키 비밀번호

키스토어 원본과 비밀번호는 분실하면 안 됩니다. 공개 저장소에 키스토어 또는 비밀번호를 커밋하지 마세요.


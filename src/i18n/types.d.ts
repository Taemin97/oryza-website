// next-intl TypeScript 타입 보강 (Type Augmentation)
// 이 파일을 통해 useTranslations / getTranslations 호출 시
// 번역 키에 대한 자동완성과 타입 체크가 활성화됩니다.

import ko from '../messages/ko.json';

type Messages = typeof ko;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface IntlMessages extends Messages {}
}

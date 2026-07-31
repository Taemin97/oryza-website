import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// 로케일을 인식하는 타입-safe 네비게이션 헬퍼 생성
// Link, redirect, usePathname, useRouter 등을 export
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

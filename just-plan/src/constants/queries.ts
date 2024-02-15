// user
export const userKeys = {
  all: ['users'] as const, // 마이페이지에서 회원 정보 조회 
  verification: () => [...userKeys.all, 'verification'] as const, // verification
}

// 일정 조회
export const planKeys = {
  all: ['plans'] as const,
  detail: (id: number) => [...planKeys.all, id] as const,
  myPlan: (page: number) => [...planKeys.all, 'my', page] as const, // 내 일정 조회
	scrap: (page: number) => [...planKeys.all, 'scrap', page] as const, // 스크랩 일정 조회
}

// 장소
export const placeKeys = {
  all: ['places'] as const,
  place: (id: number) => [...placeKeys.all, 'place', id] as const, // 단일 장소 조회
  lists: (id: number) => [...placeKeys.all, 'lists', id] as const, // planId의 전체 장소 조회
  search: (filters: string) => [...placeKeys.all, 'search', filters] as const, // 장소 검색
}

// mbti
export const mbtiKeys = {
  all: ['mbti'] as const,
}

// city
export const cityKeys = {
  all: ['cities'] as const,
  random: () => [...cityKeys.all, 'random'] as const, // 랜덤한 도시 호출,
  search: (filters: string) => [...cityKeys.all, 'search', filters] as const,
}
import { useState, useEffect } from 'react';

// ------ 컴포넌트에서 api 호출처럼 promise를 사용해야 하는 경우 간결하게 코드를 작성할 수 있는 커스텀 hooks 만듬
//
export default function usePromise(promiseCreator, deps) {
  //대기중/완료/실패 에 대한 상태관리
  const [loading, setLoading] = useState(false);
  const [resolved, setResolved] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const process = async () => {
      setLoading(true);

      try {
        const resolved = await promiseCreator();
        setResolved(resolved);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    process();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps); //나중에 대기중,완료결과, 실패결과들은 deps 배열을 파라미터로 받아온다.

  return [loading, resolved, error];
}

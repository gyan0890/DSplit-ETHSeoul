import { error } from 'console';
import { isError } from 'ethers';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNetwork } from 'wagmi';

interface Params {
  isSuccess: boolean;
  isError: boolean;
  error: Error | null;
  hash: `0x${string}` | undefined;
  Link: JSX.Element;
  onNotificationShow?: () => void;
}

const useTransactionFeedback = ({
  isSuccess,
  hash,
  Link,
  isError,
  error,
  onNotificationShow
}: Params) => {
  const { chain } = useNetwork();

  useEffect(() => {
    if (!!hash && isSuccess && chain?.blockExplorers) {
      toast.success(Link, {
        theme: 'dark',
        position: 'top-right',
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined
      });
      onNotificationShow?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, hash, chain]);

  useEffect(() => {
    if (isError && error) {
      toast.error(error.message, {
        theme: 'dark',
        position: 'top-right',
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, error]);
};

export default useTransactionFeedback;

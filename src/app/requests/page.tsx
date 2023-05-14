'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { formatUnits } from 'viem';

import { Button } from '@/components';
import Confirmation from '@/components/steps/Confirmation';
import { useRequests } from '@/hooks';
import { tokens } from '@/models/chains';
import { Request, Token, User } from '@/models/transaction';
import { smallWalletAddress } from '@/utils';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { development, LensClient, production } from '@lens-protocol/client';

const UserRequest = ({
  request,
  token,
  onClick
}: {
  request: Request;
  token: Token;
  onClick: () => void;
}) => {
  const [address, setAddress] = useState('');
  useEffect(() => {
    const checkLens = async () => {
      const lensClient = new LensClient({
        environment: process.env.NODE_ENV === 'development' ? development : production
      });

      const { items = [] } = await lensClient.profile.fetchAll({
        ownedBy: [request.to]
      });

      const [item] = items;
      setAddress(item?.handle);
    };

    checkLens();
  }, [request.to]);

  return (
    <div
      className="rounded-lg border-2 border-black p-4 mb-4 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-xl">{address || smallWalletAddress(request.to)}</h1>
        <ArrowRightIcon width={24} height={24} />
      </div>

      <div className="flex flex-row items-center text-4xl">
        <span className="mr-2">{formatUnits(request.amount, token!.decimals)}</span>
        <span>{token?.symbol}</span>
      </div>
    </div>
  );
};

const RequestPage = () => {
  const { requests } = useRequests();
  const [done, setDone] = useState(false);
  const [request, setRequest] = useState<[Request, Token, User, number]>();

  const selectRequest = (req: Request, t: Token, user: User, chainId: number) => {
    setRequest([req, t, user, chainId]);
  };

  if (request) {
    const [userRequest, token, to, chainId] = request;
    const { amount, note } = userRequest;
    return (
      <Confirmation
        transaction={{
          amount: Number(formatUnits(amount, token!.decimals)),
          chainId,
          note,
          to,
          token,
          type: 'send'
        }}
        onConfirm={() => setDone(true)}
      />
    );
  }

  return (
    <div>
      <div className="flex flex-col justify-items items-center">
        <Link href="/?type=request">
          <Button label="make a request" />
        </Link>
        <h1 className="text-2xl text-center mt-4">your requests</h1>
      </div>
      <div className="mt-4">
        {Object.keys(requests).map((chainId) => (
          <div key={chainId}>
            {requests[Number(chainId)].map((request) => {
              const token = tokens[Number(chainId)].find(
                (t) => t.address.toLowerCase() === request.token.toLowerCase()
              );
              return (
                <UserRequest
                  key={request.id}
                  request={request}
                  token={token!}
                  onClick={() =>
                    selectRequest(
                      request,
                      token!,
                      { address: request.to },
                      Number(chainId)
                    )
                  }
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestPage;

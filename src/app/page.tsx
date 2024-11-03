'use client'

import { useAccount, useConnect, useDisconnect, useWriteContract, useWatchContractEvent } from 'wagmi';
import { abi } from '../abi';

function App() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { writeContract } = useWriteContract();
  const { disconnect } = useDisconnect();
  const address = '0x20ECe9f5Bd6Fd564564eEbed1a6cb3Be000714c3';

  useWatchContractEvent({
    address,
    abi,
    eventName: 'TableCreated',
    onLogs: (logs) => console.log("Table Created", logs),
    onError: (error) => console.log("Error", error)
  })

  return (
    <>
      <div>
        <h2>Account</h2>

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === 'connected' && (
          <>
            <button type="button" onClick={() => disconnect()}>
              Disconnect
            </button>
            <button type="button" onClick={() => {
              writeContract({ 
                abi,
                address,
                functionName: 'createTable',
                args: [
                  BigInt(123),
                  BigInt(456)
                ],
             })
            }}>
              Create Table
            </button>
          </>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>
    </>
  )
}

export default App

import React, { useState, useEffect, useCallback } from 'react';

export default function Counter(props) {
  const { instance, accounts, lib } = props;
  const { _address } = instance || {};

  const [count, setCount] = useState(0);

  const getCount = useCallback(async () => {
    if (instance) {
      // Get the value from the contract to prove it worked.
      const response = await instance.methods.value().call();
      // Update state with the result.
      setCount(response);
    }
  }, [instance]);

  useEffect(() => {
    getCount();
  }, [getCount, instance]);

  const [sending, setSending] = useState(false);

  const increase = async number => {
    try {
      if (!sending) {
        setSending(true);

        await instance.methods.increase().send({ from: accounts[0] });

        getCount();

        setSending(false);
      }
    } catch (e) {
      setSending(false);
      console.log(e);
    }
  };

  return (
    <div>
      <h3>Counter Instance</h3>
      {lib && instance && (
        <React.Fragment>
          <div>
            <div>Instance address: {_address}</div>
          </div>
          <div>
            <div>Counter Value: {count}</div>
          </div>
            <React.Fragment>
              <div>
                <h4>Counter Actions</h4>
              </div>
              <div>
                <button onClick={() => increase()} size="small">
                  {sending ? <span>Sending ...</span> : <span> Increase Counter</span>}
                </button>
              </div>
            </React.Fragment>
        </React.Fragment>
      )}
    </div>
  );
}

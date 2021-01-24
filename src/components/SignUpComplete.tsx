import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import * as profileApi from 'api/profiles';
import appStoreContext from 'stores/appStoreContext';
import { Routes } from 'types';
import InputText from './InputText';
import Button from './Button';

const SignUpComplete: React.FC<{}> = () => {
  const [error, setError] = useState('');
  const [displayName, updateDisplayName] = useState('');
  const appStore = useContext(appStoreContext);
  const history = useHistory();

  function handleError(e: Error): void {
    setError(e.message);
    console.error(e);
  }

  async function handleComplete(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const profile = await profileApi.create({ displayName });
      if (profile) {
        appStore.profile = profile;
        appStore.signedIn = true;
        history.push(Routes.Profile);
      } else {
        throw new Error('Could not create profile.');
      }
    } catch (e) {
      handleError(e);
    }
  }

  return (
    <div className="SignUpComplete bg-fresh">
      <div className="container login__normal">
        <div className="row">
          <form onSubmit={handleComplete} className="form__anon">
            <div className="form__inner">
              {error && <div className="form-group has-error">{error}</div>}
              <div className="form-group">
                <p className="pull-left">
                  enter a name you would like others to see:
                </p>
                <InputText
                  type="text"
                  name="anon_username"
                  placeholder="Username"
                  value={displayName}
                  onChange={(e) => updateDisplayName(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <Button disabled={!displayName}>Contine</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpComplete;

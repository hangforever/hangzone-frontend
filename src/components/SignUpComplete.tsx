import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import * as profileApi from 'api/profiles';
import appStoreContext from 'stores/appStoreContext';
import { Routes } from 'types';

const SignUpComplete: React.FC<{}> = () => {
  const [displayName, updateDisplayName] = useState('');
  const appStore = useContext(appStoreContext);
  const history = useHistory();

  async function handleComplete(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const profile = await profileApi.create({ displayName });
      if (profile) {
        appStore.profile = profile;
      } else {
        throw new Error('Could not create profile.');
      }
    } catch (e) {
      alert(e.message);
      history.push(Routes.SignUp);
    }
  }

  return (
    <div className="SignUpComplete Login">
      <div className="row">
        <form onSubmit={handleComplete} className="form__anon">
          <div className="form__inner">
            <span>enter a name you would like others to see:</span>
            <input
              type="text"
              name="anon_username"
              placeholder="Username"
              value={displayName}
              onChange={(e) => updateDisplayName(e.target.value)}
            />
          </div>
          <input
            className="btn--no-border"
            type="submit"
            value="CONTINUE >>"
            disabled={!displayName}
          />
        </form>
      </div>
    </div>
  );
};

export default SignUpComplete;

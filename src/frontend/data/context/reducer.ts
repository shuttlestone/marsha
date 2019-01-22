import { AnyAction, Reducer } from 'redux';

import { appState } from '../../types/AppData';
import { UploadableObject, Video } from '../../types/tracks';
import { appData } from '../appData';
import { UploadProgressNotification } from './actions';

export interface ContextState<state> {
  jwt: state extends appState.ERROR ? null : string;
  ltiResourceVideo: state extends appState.ERROR ? null : Video;
  ltiState: state;
  uploads_progress: {
    [uploadableObjectId: string]: number;
  };
}

export const initialState = {
  jwt: appData.jwt || null,
  ltiResourceVideo: appData.video || null,
  ltiState: appData.state,
  uploads_progress: {},
};

export const context: Reducer<ContextState<appState>> = (
  state: ContextState<appState> = initialState,
  action?: UploadProgressNotification<UploadableObject> | AnyAction,
) => {
  if (!action) {
    return state;
  }

  switch (action.type) {
    case 'UPLOAD_PROGRESS_NOTIFY':
      return {
        ...state,
        uploads_progress: {
          ...state.uploads_progress,
          [action.id]: action.progress,
        },
      };
  }

  return state;
};
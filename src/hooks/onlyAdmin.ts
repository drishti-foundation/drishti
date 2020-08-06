import { Hook, HookContext } from '@feathersjs/feathers';
import { Forbidden } from '@feathersjs/errors';

export default (): Hook => async (context: HookContext) => {
  const { params } = context;

  if (params.provider && params.user?.username !== 'admin') {
    throw new Forbidden('Admin access only');
  }

  return context;
};

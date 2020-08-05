import { Hook, HookContext } from '@feathersjs/feathers';

export default (): Hook => {
  return async (context: HookContext) => {
    const { params } = context;

    if (params.provider && !params.authentication) {
      context.params = {
        ...params,
        authentication: {
          strategy: 'anonymous',
        },
      };
    }

    return context;
  };
};

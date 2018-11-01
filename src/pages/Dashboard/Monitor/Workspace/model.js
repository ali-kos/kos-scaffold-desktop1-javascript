import { notification } from 'antd';
// import history from '@/common/utils/history';
import { add } from './service';

export default {
  initial: {
    addForm: {
      page_name: '1234',
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  asyncs: {
    async save(dispatch, getState, { payload }) {
      const state = getState();
      console.log('payload ==>', payload);
      const { addForm } = state;

      const data = await add({ ...addForm });

      if (data.ok) {
        notification.success({
          message: '恭喜您！',
          description: '添加成功！',
        });
        // history.push('/dashboard/monitor');
      }
    },
  },
  validators: [
    {
      formName: 'addForm',
      validators: [
        {
          field: 'page_name',
          rules: 'required',
        },
        {
          field: 'page_desc',
          rules: [
            'required',
            // (getState, { field, value }, data) => value && value.length <= 3,
          ],
          help: '请正确填写',
        },
        {
          field: 'page_name',
          rules: [
            'required@好好填',
            {
              name: 'maxLength',
              data: 4,
              help: 'maxLength:{0}',
            },
          ],
        },
        {
          field: 'page_name',
          help: '异步校验失败',
          rules: {
            data: { a: 1 },
            fn: async (getState, { field, value }, data) => {
              const xdata = await add({});
              console.log('xdata ==>', xdata);
              console.log('field, value, data ==>', field, value, data);
              return true;
            },
          },
        },
      ],
    },
  ],
  formFieldDisplay: {
    addForm: {
      page_type: (getState, { field, value }) => {
        console.log(value, field);

        return {
          page_desc: value === 'pc',
        };
      },
    },
  },
};

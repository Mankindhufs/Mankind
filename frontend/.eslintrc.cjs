module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser', //기본적으로 js 코드만 이해하기 때문에 ts코드도 이해하도록 설정
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:@typescript-eslint/recommended',
    'plugin:plugin:prettier/recommended', // 설정한 .prettierrc을 기반으로 해당 형식이 어긋나면 eslint에서 에러 처리
  ],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }, //익명 컴포넌트 처리할 수 없을 때 에러 발생
    ],
    'react/react-in-jsx-scope': 'off', //import react가 없어도 에러 발생시키지 않음
    'react/jsx-uses-react': 'off',
  },
};

const registerTmpl = `
    <div class="form">
        <h1 class="form__title">Регистрация</h1>
        <form name="registerForm" class="form__container">
          {{{emailInput}}}
          {{{loginInput}}}
          {{{firstNameInput}}}
          {{{secondNameInput}}}
          {{{phoneInput}}}
          {{{passwordInput}}}
          {{{passwordCheckInput}}}
        </form>
        <div class="form__buttons">
          {{{registerButton}}}
          {{{authorizeButton}}}
        </div>
    </div>
`;
export {registerTmpl};

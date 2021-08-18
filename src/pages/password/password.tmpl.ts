const passwordTmpl = `
    <div class="password">
        <h1 class="password__title">Изменить пароль</h1>

        <form name="passwordForm" class="form__container">
          {{{passwordOldInput}}}
          {{{passwordNewInput}}}
          {{{passwordCheckInput}}}
        </form>
        <div class="form__buttons">
          {{{passwordSaveButton}}}
          <br/>
          {{{passwordBackButton}}}
        </div>
    </div>
`;
export {passwordTmpl};

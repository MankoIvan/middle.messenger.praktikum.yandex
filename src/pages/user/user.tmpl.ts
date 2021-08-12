const userTmpl = `
    <div class="user">
        <h1 class="user__title">Профиль</h1>
        <div class="user__img">
                <p class="user__img-coverText">Изменить<br>аватар</p>
        </div>
        <form name="userForm" class="form__container">
          {{{emailInput}}}
          {{{loginInput}}}
          {{{firstNameInput}}}
          {{{secondNameInput}}}
          {{{phoneInput}}}
          {{{chatName}}}
        </form>
        <div class="form__buttons">
          {{{userSaveButton}}}
          {{{userChangePasswordButton}}}
          {{{userExitButton}}}
          <br/>
          {{{userBackButton}}}
        </div>
    </div>
`;
export {userTmpl};

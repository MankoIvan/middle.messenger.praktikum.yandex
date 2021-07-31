const userTmpl = `
    <div class="form">
        <h1 class="form__title">Профиль</h1>
        <div class="form__userImg">
                <p class="form__userImg-coverText">Изменить<br>аватар</p>
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
          {{{saveButton}}}
          {{{changePasswordButton}}}
          {{{goBackButton}}}
        </div>
    </div>
`;
export {userTmpl};

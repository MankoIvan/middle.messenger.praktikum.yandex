const userTmpl = `
    <div class="user">
        <h1 class="user__title">Профиль</h1>
        <img class="user__img" {{#if userData.avatar}}src={{userData.avatar}}{{/if}}>
                <p class="user__img-coverText">Изменить<br>аватар</p>
        </img>
        <!--<input type="file" id="userAvatar" class="user__avatarInput">-->
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

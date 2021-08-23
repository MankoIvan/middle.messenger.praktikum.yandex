const userTmpl = `
    <div class="user">
        <h1 class="user__title">Профиль</h1>
        {{#if userData.avatar}}
        <img class="user__img" 
          src=https://ya-praktikum.tech/api/v2/resources{{userData.avatar}}>
        
        </img>
        {{/if}}
        <form class="user__changeAvatar" id="userAvatarForm">
          <input type="file" id="userAvatarInput" class="user__changeAvatar-input"
          name="userAvatarInput" accept='image/*'">
          {{{userChangeAvatar}}}
        </form>
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

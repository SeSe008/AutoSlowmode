<template>
  <div id="capabilities">
    <h2>Capabilities</h2>
    <div class="capability">
      <div class="desc">
        <h3>Spam Protection</h3>
        <span>
          Automatic spam protection.<br />When a user sends two messages in a specific time, they
          get a short timeout. This stops bots, that spam messages in all Channels from succesing entirely.
        </span>
      </div>
      <img src="@/assets/images/timeout.png" alt="Timeout" />
    </div>
    <div class="capability">
      <div class="desc">
        <h3>DM and Invite Blocker</h3>
        <span>
          Can block both direct messages and invites for all members guild-wide.<br />Uses the new Security Actions feature every
          24 hours, so you do not have to worry about manually setting it.
        </span>
      </div>
      <img src="@/assets/images/dm_block.png" alt="Timeout" />
    </div>
  </div>
</template>

<style lang="css" scoped>
#capabilities {
  display: flex;
  flex-direction: column;
  gap: 2.5vh;
}

h2 {
  color: rgb(var(--color6));
  font-size: xx-large;
  text-align: center;
}

.capability {
  padding: 1rem 5rem;
  background-color: rgba(var(--color4), 0.3);
  color: rgb(var(--color6));
  gap: 1rem;
  justify-content: center;
}

@media screen and (min-width: 1024px) {
  .capability {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
  }

  .capability > .desc {
    padding-left: 5rem;
  }
}

@media screen and (max-width: 1024px) {
  .capability {
    display: flex;
    flex-direction: column;
  }
}

.capability > img {
  flex-grow: 0;
  height: auto;
  width: auto;
  max-width: 100%;
  align-self: center;
  border-radius: 0.75rem;
  border: 1px solid rgb(var(--color5));
  object-fit: contain;
}
</style>

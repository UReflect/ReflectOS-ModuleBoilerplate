name="" 
while [ -z "$name" ]; do
    printf '\e[1;32m%s\e[m \e[1;37m%s\e[m\n' "?" "Enter the project name: "
    read name
done

vue create $name && cd $name && yarn && yarn add vue-i18n @drartemi/mc.js reflectos-sdk -D
command -v git >/dev/null 2>&1 || {
    echo "Error: git is not installed"
    exit 1
  }
git init && git add --all && git commit --amend -m "chore: initial commit from @UReflect" --author="uReflect <dev@ureflect.io>";


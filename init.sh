name=""
while [ -z "$name" ]; do
    printf '\e[1;32m%s\e[m \e[1;37m%s\e[m\n' "?" "Enter the project name: "
    read name
done

vue create $name && cd $name && yarn && yarn add vue-i18n @drartemi/mc.js reflectos-sdk -D
vue add electron-builder


name=""
while [ -z "$name" ]; do
printf 'Enter the project name: \n'
    read name
done

vue create $name && yarn && yarn add i18n @drartemi/mc.js reflectos-sdk -D;

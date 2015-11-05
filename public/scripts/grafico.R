#!/usr/bin/env Rscript
library("ggplot2")

# Agrupaciones del eje X
grupo <- c("A","A","A","B","B","B","C","C","C")
# Valores del eje X
ejeX <- c("GRUPO 1","GRUPO 2","GRUPO 3","GRUPO 1","GRUPO 2","GRUPO 3","GRUPO 1","GRUPO 2","GRUPO 3")
# Valores del eje Y
ejeY <- c(1,2,3,6,5,4,7,8,9)

# Genera los factores de los valores agrupados indicando que son caracteres
# Esto es necesario para que se muestren en el orden introducido
grupo.factor <- factor(grupo)
ejeX.factor <- factor(ejeX)
as.character(grupo.factor)
as.character(ejeX.factor)

# Creamos un marco con los datos que vamos a usar en el gráfico
datos <- data.frame(grupo.factor, ejeX.factor, ejeY)

# Generamos el gráfico
ggplot(data = datos, aes(x = ejeX.factor, y = ejeY, fill = grupo.factor)) +
  geom_bar(stat = "identity", position = position_dodge(), colour = "black") +
  coord_cartesian(ylim=c(0, 10)) +
  scale_y_continuous(breaks=seq(0, 10, 0.5)) +
  scale_fill_discrete(name="Leyenda") +
  xlab("Eje X") + ylab("Eje Y") + ggtitle("Título") +
  theme(plot.title=element_text(face="bold", size=20),
        axis.title=element_text(size=14))

ggsave("public/scripts/grafico.png")

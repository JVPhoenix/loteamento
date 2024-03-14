export default function About() {
  return (
    <div className="flex flex-col gap-1 text-gray1 font-medium text-center items-center my-8">
      <h1 className="text-white drop-shadow-titles text-2xl response:text-3xl font-bold mb-4">SOBRE O LOTEAMENTO</h1>
      <div className="flex flex-col response1:flex-row gap-14">
        <div className="flex flex-col gap-4 w-[400px] px-4 response:px-0">
          <h3 className="font-bold text-white text-xl">Estrutura</h3>
          <div className="text-justify">
            <p>O Loteamento R. Martins é mais completo e mais estruturado de Cocal, atualmente ele possui:</p>
            <ul className="list-disc pl-10 py-2 leading-7">
              <li>Localização Privlegiada.</li>
              <li>Rede Elétrica Completa.</li>
              <li>Iluminação Pública.</li>
              <li>Água Encanada.</li>
              <li>Ruas com piçarra e Meio Fio.</li>
              <li>Toda a estrutura pronta para você construir.</li>
            </ul>
            <p>
              Você pode conferir nossa estrutura clicando em fotos na barra de menu acima, navegando pela galeria que
              está junto a imagem do mapa ou agendando uma visita entrando em contato conosco, por algum dos meios de
              contato no fim da página!
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-[400px] px-4 response:px-0">
          <h3 className="font-bold text-white text-xl">Localização</h3>
          <div className="flex flex-col text-justify gap-3">
            <p>
              O loteamento está ocalizado as margens da PI-309 na saída de Cocal para o Videu, no Bairro Noventa, em
              frente ao Parque Aquático Vale Encantado.
            </p>
            <p>
              Nosso escritório de vendas está localizado na Rua José Barcelos Fontenele, Nº 710, no centro de Cocal -
              Píaui.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-[400px] px-4 response:px-0">
          <h3 className="font-bold text-white text-xl">Planos</h3>
          <div className="flex flex-col text-justify gap-2">
            <p>Atualmente trabalhamos com dois tipos de planos para que você adquira seu lote!</p>
            <p>
              1 - Pagamentos <strong>A VISTA</strong> do valor integral do lote.
            </p>
            <p>
              2 - Pagamentos <strong>A PRAZO</strong>, com entrada de <strong> 10% do valor do lote, </strong>
              pagos em dinheiro, pix ou cartão (com acréscimo), com parcelas de até 48x.
            </p>
            <span>
              As parcelas serão emitidas em um <strong>carnê</strong>, que é pago em nosso escritório com dinheiro em
              espécie, ou on-line através do pix com envio de comprovante.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
